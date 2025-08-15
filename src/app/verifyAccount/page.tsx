// src/app/verifyAccount/page.tsx
'use client'; // This directive tells Next.js to render this component only on the client-side.

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Assuming you might use useRouter and useSearchParams

// This component handles the account verification process, often using a token from the URL.
const VerifyAccountPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('Verifying your account...');

  useEffect(() => {
    // This code will ONLY run in the browser environment
    if (typeof window !== 'undefined') {
      const token = searchParams.get('token'); // Get token from URL query parameters
      if (token) {
        setVerificationStatus('Token found. Sending to server for verification...');
        // In a real app, you would send this token to your API to verify the account
        // Example: fetch('/api/auth/verify-token', { method: 'POST', body: JSON.stringify({ token }) })
        //   .then(res => res.json())
        //   .then(data => {
        //     if (data.success) {
        //       setVerificationStatus('Account verified successfully!');
        //       localStorage.setItem('isVerified', 'true'); // Example of using localStorage
        //       router.push('/signin'); // Redirect to sign-in page
        //     } else {
        //       setVerificationStatus('Verification failed: ' + data.message);
        //     }
        //   })
        //   .catch(error => {
        //     console.error('Verification API error:', error);
        //     setVerificationStatus('An error occurred during verification.');
        //   });
      } else {
        setVerificationStatus('No verification token found. Please check your link.');
        // router.push('/signup'); // Or redirect to a page to request a new token
      }
      // You can also use localStorage.setItem here if needed
      // localStorage.setItem('lastVerificationAttempt', new Date().toISOString());
    }
  }, [searchParams, router]); // Depend on searchParams and router to re-run if they change

  // The rest of your page component's logic and JSX goes here.
  // This is just a placeholder to demonstrate the localStorage fix and basic verification flow.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Account Verification</h1>
        <p className="text-gray-600">
          {verificationStatus}
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
