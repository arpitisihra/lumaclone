// src/app/create/page.tsx
'use client'; // This directive tells Next.js to render this component only on the client-side.

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you might use useRouter

// Example of a component that might use localStorage for something like theme
const CreateEventPage: React.FC = () => {
  const router = useRouter();
  const [theme, setTheme] = useState('light'); // Example state for theme

  useEffect(() => {
    // This code will ONLY run in the browser environment
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('appTheme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
      // You can also use localStorage.setItem here if needed
      // localStorage.setItem('lastVisitedPage', router.pathname);
    }
  }, []); // Empty dependency array means this effect runs once after initial render in the browser

  // The rest of your page component's logic and JSX goes here.
  // This is just a placeholder to demonstrate the localStorage fix.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
        <p className="text-gray-600">
          This is the create event page. Current theme: {theme}
        </p>
        <button
          onClick={() => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            if (typeof window !== 'undefined') {
              localStorage.setItem('appTheme', newTheme);
            }
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle Theme
        </button>
        {/* Add your actual event creation form and logic here */}
      </div>
    </div>
  );
};

export default CreateEventPage;