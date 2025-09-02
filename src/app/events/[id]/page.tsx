'use client';

import { useRouter } from 'next/navigation';
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

const EventDetailsPage = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = params;

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
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred.');
          }
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <img
          src={event.imageUrl || 'https://placehold.co/1200x600/FFF/000?text=Event+Image'}
          alt={event.title}
          className="w-full rounded-md object-contain"
        />
        <div className="mt-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{event.title}</h1>
          <p className="text-gray-600 text-sm mb-2">{new Date(event.date).toLocaleString()}</p>
          <p className="text-lg text-gray-700 mb-4">{event.description}</p>
          <p className="text-gray-500 text-md">Location: {event.location}</p>
        </div>
        <button
          onClick={() => router.push('/home')}
          className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
