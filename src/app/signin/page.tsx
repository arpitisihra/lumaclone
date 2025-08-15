// src/app/signin/page.tsx
'use client'; // This directive tells Next.js to render this component only on the client-side.

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you might use useRouter

// This component represents the user sign-in page.
const SignInPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // This code will ONLY run in the browser environment
    if (typeof window !== 'undefined') {
      // Example: Check if a user was previously logged in or has a remembered email
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        setMessage('Welcome back! Enter your password.');
      } else {
        setMessage('Please sign in to continue.');
      }
      // You can also use localStorage.setItem here if needed
      // localStorage.setItem('lastSignInAttempt', new Date().toISOString());
    }
  }, []); // Empty dependency array means this effect runs once after initial render in the browser

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Signing in...');

    // In a real app, you would send email/password to your API for authentication
    // Example: const response = await fetch('/api/auth/generate-token', { method: 'POST', body: JSON.stringify({ email, password }) });
    // For this clone, we'll simulate success/failure
    if (email === 'test@example.com' && password === 'password123') {
      setMessage('Sign in successful! Redirecting...');
      if (typeof window !== 'undefined') {
        localStorage.setItem('rememberedEmail', email); // Remember email
      }
      router.push('/home'); // Redirect to home on success
    } else {
      setMessage('Invalid email or password.');
    }
  };

  // The rest of your page component's logic and JSX goes here.
  // This is just a placeholder to demonstrate the localStorage fix and basic sign-in form.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign In
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/signup')}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
