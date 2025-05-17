import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Flowbite
      </a>
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow sm:p-8">
        <CardHeader>
          <CardTitle>Επαναφορά κωδικού</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action="#">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="name@int02457.com"
                required
              />
            </div>

            {/* Νέο password με toggle */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Νέο Password</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-600"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Επιβεβαίωση password με toggle */}
            <div className="space-y-2 relative">
              <Label htmlFor="confirm-password">Επιβεβαίωση password</Label>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                name="confirm-password"
                placeholder="••••••••"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-9 text-gray-600"
                tabIndex={-1}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button type="submit" className="px-3 py-1 text-sm">
              Reset password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
