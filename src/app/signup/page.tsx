'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';

const SignUpPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In the next step, this will call an API to send an OTP
    toast.info(`Sending OTP to ${phoneNumber}...`);
    // Placeholder for now, will redirect to OTP page later
    setLoading(false);
  };

  const handleGoogleSignIn = () => {
    // Redirect to Google's OAuth consent screen
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/auth/google-signin/callback`;
    const scope = 'openid email profile';
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;
    
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
        
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your phone number"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Sending OTP...' : 'Continue with Phone'}
          </button>
        </form>
        
        <div className="flex items-center justify-between">
          <div className="w-full h-[1px] bg-gray-300" />
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="w-full h-[1px] bg-gray-300" />
        </div>
        
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <img src="https://www.gstatic.com/images/icons/material/product/1x/google_20dp.png" alt="Google icon" className="mr-2" />
          Sign in with Google
        </button>
        
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account? {' '}
          <button onClick={() => router.push('/signin')} className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </button>
        </p>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default SignUpPage;