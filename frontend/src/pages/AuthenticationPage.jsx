import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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


//function LoginForm() {
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');

  //const handleLogin = async () => {
    //try {
      //const response = await axios.post('/api/login', { username, password });
      //console.log('Login success:', response.data);
      //// αποθήκευση token ή redirect
   // } catch (error) {
     // console.error('Login error:', error.response?.data || error.message);
    //}
 // };

//  return (
  //  <>
    //  <input value={username} onChange={e => setUsername(e.target.value)} />
      //<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
     // <button onClick={handleLogin}>Login</button>
   // </>
 // );
//}





function AuthenticationPage() {
  const [showSignupPassword, setshowSignupPassword] = useState(false);
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
                <Input id="login-username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Κωδικός</Label>
                <Input id="login-password" type="password" />
                
              </div>

              {/* Remember me */}
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
              <Button className="px-3 py-1 text-sm">Είσοδος</Button>
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
                <Input id="signup-email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-name">Όνομα</Label>
                <Input id="signup-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input id="signup-username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Κωδικός</Label>
              <div className="relative">
               <Input
                id="signup-password"
                type={showSignupPassword ? "text" : "password"}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowSignupPassword(!showSignupPassword)}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-3600"
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
              <Button className="px-3 py-1 text-sm">Εγγραφή</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthenticationPage;
