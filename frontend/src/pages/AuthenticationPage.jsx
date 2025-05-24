import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function AuthenticationPage() {
  // Login states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // Signup states
  const [signupEmail, setSignupEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  // Navigation
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username: loginUsername,
        password: loginPassword,
      });
      console.log('Login success:', response.data);
      // πχ αποθήκευση token στο localStorage
      localStorage.setItem('token', response.data.token);
      // redirect στην αρχική σελίδα μετά login
      navigate('/homepage');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Λάθος username ή κωδικός');
    }
  };

  // Handle Signup
  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/signup', {
        email: signupEmail,
        name: signupName,
        username: signupUsername,
        password: signupPassword,
      });
      console.log('Signup success:', response.data);
      alert('Εγγραφή επιτυχής! Μπορείτε τώρα να συνδεθείτε.');
      // Καθαρισμός πεδίων signup μετά επιτυχία
      setSignupEmail('');
      setSignupName('');
      setSignupUsername('');
      setSignupPassword('');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert('Σφάλμα κατά την εγγραφή.');
    }
  };

  return (
    <div className="flex justify-center px-4 sm:px-6 md:px-8 lg:px-0">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Σύνδεση</TabsTrigger>
          <TabsTrigger value="signup">Εγγραφή</TabsTrigger>
        </TabsList>

        {/* --- ΣΥΝΔΕΣΗ --- */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Σύνδεση</CardTitle>
              <CardDescription />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Username</Label>
                <Input
                  id="login-username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Κωδικός</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-2"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-500">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgotPassword"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="px-3 py-1 text-sm"
                onClick={handleLogin}
              >
                Είσοδος
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* --- ΕΓΓΡΑΦΗ --- */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Εγγραφή</CardTitle>
              <CardDescription />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-name">Όνομα</Label>
                <Input
                  id="signup-name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Κωδικός</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showSignupPassword ? "text" : "password"}
                    className="pr-10"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    aria-label={showSignupPassword ? "Απόκρυψη κωδικού" : "Εμφάνιση κωδικού"}
                  >
                    {showSignupPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="px-3 py-1 text-sm"
                onClick={handleSignup}
              >
                Εγγραφή
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthenticationPage;
