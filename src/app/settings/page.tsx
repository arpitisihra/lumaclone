// src/app/settings/page.tsx
'use client'; // This directive tells Next.js to render this component only on the client-side.

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you might use useRouter

// This component represents the user settings page.
const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [userPreference, setUserPreference] = useState('default'); // Example state for a user setting

  useEffect(() => {
    // This code will ONLY run in the browser environment
    if (typeof window !== 'undefined') {
      // Example: Retrieve a user preference from localStorage
      const savedPreference = localStorage.getItem('userPreference');
      if (savedPreference) {
        setUserPreference(savedPreference);
      }
      // You can also use localStorage.setItem here if needed
      // localStorage.setItem('lastSettingsVisit', new Date().toISOString());
    }
  }, []); // Empty dependency array means this effect runs once after initial render in the browser

  // Function to handle changing a setting and saving to localStorage
  const handlePreferenceChange = (newPref: string) => {
    setUserPreference(newPref);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userPreference', newPref);
    }
  };

  // The rest of your page component's logic and JSX goes here.
  // This is just a placeholder to demonstrate the localStorage fix.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">User Settings</h1>
        <p className="text-lg text-gray-700 mb-6">
          Manage your preferences for the LumaClone app.
        </p>
        <div className="space-y-4">
          <label className="block text-left">
            <span className="text-gray-700">Current Preference:</span>
            <select
              value={userPreference}
              onChange={(e) => handlePreferenceChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="default">Default</option>
              <option value="dark_mode">Dark Mode</option>
              <option value="notifications_on">Notifications On</option>
            </select>
          </label>
        </div>
        <button
          onClick={() => router.push('/')}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors transform hover:scale-105"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
