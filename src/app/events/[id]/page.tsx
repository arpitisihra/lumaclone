'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string | null;
  organizerId: string;
}

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch event details');
          }
          const data = await response.json();
          setEvent(data.event);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred.');
          toast.error('Failed to load event details.');
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 bg-white p-6 rounded-3xl shadow-lg">
        {/* Left Side: Image and Sidebar */}
        <div className="flex-1 space-y-6">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
            <img
              src={event.imageUrl || 'https://placehold.co/800x1067/F0F0F0/000?text=Event+Image'}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl shadow-inner space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">Hosted By</h3>
              {/* This could be a link to the organizer's page */}
              <p className="text-indigo-600 font-semibold cursor-pointer hover:underline">Defactor</p>
            </div>
            <div className="text-gray-500 text-sm">
              61 Going
            </div>
            <button className="text-red-500 text-sm hover:underline">
              Report Event
            </button>
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 text-sm">#Crypto</span>
            </div>
          </div>
        </div>

        {/* Right Side: Event Details */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{event.title}</h1>

          {/* Date and Time */}
          <div className="flex items-center gap-4 text-gray-600">
            <div className="text-center font-bold text-lg">
              <p className="uppercase text-indigo-600">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
              </p>
              <p className="text-3xl">
                {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit' })}
              </p>
            </div>
            <div className="text-md">
              <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' })}, {new Date(event.date).toLocaleDateString()}</p>
              <p>{new Date(event.date).toLocaleTimeString()}</p>
              <p className="text-sm">{new Date(event.date).toTimeString().split(' ')[1]}</p>
            </div>
          </div>

          {/* Registration Section */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-inner space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Registration</h2>
            <div className="flex items-start gap-3">
              <p className="text-gray-600">Approval Required</p>
            </div>
            <p className="text-sm text-gray-500">Your registration is subject to approval by the host.</p>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-gray-700 font-semibold mb-2">Welcome! To join the event, please register below.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-colors">
                  Request to Join
                </button>
              </div>
            </div>
          </div>

          {/* About Event */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">About Event</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => router.push('/home')}
        className="mt-8 px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors"
      >
        Back to Events
      </button>
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default EventDetailsPage;

    
