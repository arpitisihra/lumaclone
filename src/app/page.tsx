// src/app/page.tsx
'use client'; // This directive tells Next.js to render this component only on the client-side.

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you might use useRouter

// This component represents the main landing page of your application.
const LandingPage: React.FC = () => {
  const router = useRouter();
  const [greeting, setGreeting] = useState('Hello there!'); // Example state

  useEffect(() => {
    // This code will ONLY run in the browser environment
    if (typeof window !== 'undefined') {
      // Example: Check if a user has visited before or set a flag
      const hasVisited = localStorage.getItem('hasVisitedLumaClone');
      if (!hasVisited) {
        setGreeting('Welcome to LumaClone!');
        localStorage.setItem('hasVisitedLumaClone', 'true');
      } else {
        setGreeting('Welcome back to LumaClone!');
      }
      // You can also use localStorage.setItem here if needed
      // localStorage.setItem('lastActivePage', '/');
    }
  }, []); // Empty dependency array means this effect runs once after initial render in the browser

  // The rest of your page component's logic and JSX goes here.
  // This is just a placeholder to demonstrate the localStorage fix.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold mb-4">{greeting}</h1>
        <p className="text-xl text-gray-700 mb-6">
          Your platform for delightful events, made for your domestic market.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push('/home')} // Assuming /home is your main event listing
            className="px-8 py-4 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors transform hover:scale-105"
          >
            Explore Events
          </button>
          <button
            onClick={() => router.push('/create')}
            className="px-8 py-4 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-colors transform hover:scale-105"
          >
            Create Your Event
          </button>
        </div>
        {/* Add more landing page content, testimonials, features etc. here */}
      </div>
    </div>
  );
};

export default LandingPage;