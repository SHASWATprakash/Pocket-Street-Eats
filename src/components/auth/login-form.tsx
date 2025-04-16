'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {auth} from '@/lib/firebase';
import {useToast} from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email address.'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters.'}),
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {toast} = useToast();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultvalues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginValues) {
    setIsSubmitting(true);
    try {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized!');
      }
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Login successful!',
        description: 'You have successfully logged in.',
      });
      router.push('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        variant: 'destructive',
        title: 'Login failed.',
        description: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password to login.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
