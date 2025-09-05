'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const GoogleLoginButton = () => {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    // This will redirect to your backend API route that starts the Google OAuth flow
    router.push('/api/auth/google');
    toast.loading('Redirecting to Google...', { duration: 5000 });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    >
      <img src="https://www.gstatic.com/images/icons/material/product/1x/google_20dp.png" alt="Google icon" className="mr-2" />
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
