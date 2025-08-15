// src/app/home/page.tsx
'use client'; // This directive tells Next.js to render this component only on the client-side.

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you might use useRouter

// This component represents the main home page of your application.
const HomePage: React.FC = () => {
  const router = useRouter();
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome!'); // Example state

  useEffect(() => {
    // This code will ONLY run in the browser environment
    if (typeof window !== 'undefined') {
      // Example: Retrieve a user's name or last visited time from localStorage
      const userName = localStorage.getItem('userName');
      if (userName) {
        setWelcomeMessage(`Welcome back, ${userName}!`);
      } else {
        setWelcomeMessage('Welcome to LumaClone!');
      }
      // You can also use localStorage.setItem here if needed
      // localStorage.setItem('lastVisitedHome', new Date().toISOString());
    }
  }, []); // Empty dependency array means this effect runs once after initial render in the browser

  // The rest of your page component's logic and JSX goes here.
  // This is just a placeholder to demonstrate the localStorage fix.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">{welcomeMessage}</h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover and create amazing events in your domestic market!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push('/create')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Create an Event
          </button>
          <button
            onClick={() => router.push('/events')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Browse Events
          </button>
        </div>
        {/* Add more home page content, event listings, etc. here */}
      </div>
    </div>
  );
};

export default HomePage;