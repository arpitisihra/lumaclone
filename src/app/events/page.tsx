// src/app/events/page.tsx
'use client'; // This directive tells Next.js to render this component only on the client-side.

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you might use useRouter

// This component displays a list of events.
const EventsPage: React.FC = () => {
  const router = useRouter();
  const [eventListStatus, setEventListStatus] = useState('Loading events...'); // Example state

  useEffect(() => {
    // This code will ONLY run in the browser environment
    if (typeof window !== 'undefined') {
      // Example: Check if there's a cached event list or user preference for filtering
      const lastViewedCategory = localStorage.getItem('lastEventCategory');
      if (lastViewedCategory) {
        setEventListStatus(`Showing events for: ${lastViewedCategory}`);
        // In a real app, you'd fetch events based on this category
      } else {
        setEventListStatus('Displaying all upcoming events.');
      }
      // You can also use localStorage.setItem here if needed
      // localStorage.setItem('lastViewedEventsPage', new Date().toISOString());
    }
  }, []); // Empty dependency array means this effect runs once after initial render in the browser

  // The rest of your page component's logic and JSX goes here.
  // This is just a placeholder to demonstrate the localStorage fix and basic events page structure.
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          {eventListStatus}
        </p>

        {/* Placeholder for event cards or list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Event Card 1 */}
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">Community Tech Meetup</h2>
            <p className="text-gray-600 text-sm">Aug 20, 2025 | Online</p>
            <p className="text-gray-700 mt-2">Join us to discuss the latest in web development.</p>
            <button onClick={() => router.push('/event/tech-meetup')} className="mt-4 text-blue-600 hover:underline">View Details</button>
          </div>
          {/* Example Event Card 2 */}
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">Local Food Festival</h2>
            <p className="text-gray-600 text-sm">Sep 5, 2025 | City Park</p>
            <p className="text-gray-700 mt-2">Taste the best local cuisines and enjoy live music.</p>
            <button onClick={() => router.push('/event/food-fest')} className="mt-4 text-blue-600 hover:underline">View Details</button>
          </div>
          {/* Example Event Card 3 */}
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">Art Exhibition Opening</h2>
            <p className="text-gray-600 text-sm">Oct 1, 2025 | Art Gallery</p>
            <p className="text-gray-700 mt-2">Explore contemporary art from local artists.</p>
            <button onClick={() => router.push('/event/art-exhibit')} className="mt-4 text-blue-600 hover:underline">View Details</button>
          </div>
        </div>

        <button
          onClick={() => router.push('/')}
          className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default EventsPage;
