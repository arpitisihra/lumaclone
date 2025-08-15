// src/app/create/page.tsx
'use client'; // This directive tells Next.js to render this component only on the client-side.

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; // For user notifications

const CreateEventPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // For optional image URL
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading('Creating event...');

    // For a real app, you'd get the actual organizerId (e.g., from a logged-in user session)
    // For this example, we'll use a placeholder or a default user ID if available in your DB.
    // Make sure you have at least one user in your Supabase 'User' table
    // You can manually add a user in Supabase Studio -> Table Editor -> 'User' table
    // Or, if your app has a signup flow, sign up a user first.
    const organizerId = '979324c7-1f2b-485f-b2ab-f7586741b173'; // <<< THIS HAS BEEN UPDATED WITH YOUR ID

    // The previous check was: if (organizerId === 'YOUR_DEFAULT_ORGANIZER_ID') { ... return; }
    // This new error indicates the request is now reaching the backend with a null/invalid ID.
    // So, ensure organizerId is a valid string from your Supabase User table.
    if (!organizerId || organizerId === 'YOUR_DEFAULT_ORGANIZER_ID') { // Keep this check for future safety
      toast.error('Organizer ID is missing or invalid. Please replace the placeholder.');
      setLoading(false);
      return;
    }


    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          date,
          location,
          imageUrl,
          organizerId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Event created successfully!');
        // Clear form or redirect
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
        setImageUrl('');
        router.push('/home'); // Redirect to home or events list
      } else {
        toast.error(data.message || 'Failed to create event.');
        console.error('API Error:', data.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error('Network or unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-1">
              Event Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-1">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-1">
              Date & Time:
            </label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-1">
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-1">
              Image URL (Optional):
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., https://example.com/event-banner.jpg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
