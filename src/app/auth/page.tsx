'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {LoginForm} from '@/components/auth/login-form';
import {SignUpForm} from '@/components/auth/signup-form';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useAuth} from '@/hooks/use-auth';

const AuthPage = () => {
  const router = useRouter();
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Pocket <span className="text-primary">Street Eats</span>
        </h1>
        <p className="mt-3 text-2xl">Sign up or log in to continue</p>

        <div className="container py-12">
          <div className="flex justify-center">
            <div className="w-full md:w-96">
              <Tabs defaultvalue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
