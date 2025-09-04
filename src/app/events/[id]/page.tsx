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
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-[420px,1fr] gap-8 bg-white p-8 rounded-3xl shadow-lg">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Event Banner */}
          <div className="w-[420px] h-[420px] rounded-xl overflow-hidden shadow-md">
            <img
              src={event.imageUrl || 'https://placehold.co/420x420/F0F0F0/000?text=Event+Image'}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Sidebar Info */}
          <div className="p-4 bg-gray-50 rounded-xl shadow-inner space-y-4 w-[420px]">
            {/* Hosted By */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div>
                <p className="text-xs text-gray-500">Hosted by</p>
                <p className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                  Defactor
                </p>
              </div>
            </div>

            {/* Attendees */}
            <div className="text-sm text-gray-600">61 Going</div>

            {/* Tags */}
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 text-sm">#Crypto</span>
            </div>

            <button className="text-red-500 text-xs hover:underline">
              Report Event
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8 max-w-[600px]">
          {/* Event Title */}
          <h1 className="text-[28px] font-bold text-gray-900">{event.title}</h1>

          {/* Date & Time */}
          <div className="flex items-center gap-4 text-gray-700">
            <div className="text-center w-16">
              <p className="uppercase text-indigo-600 font-semibold">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
              </p>
              <p className="text-3xl font-bold">
                {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit' })}
              </p>
            </div>
            <div className="text-sm">
              <p className="font-medium">
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
              <p>{new Date(event.date).toLocaleTimeString()}</p>
              <p className="text-xs text-gray-500">{event.location}</p>
            </div>
          </div>

          {/* Registration Card */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner space-y-4">
            <p className="text-sm font-medium text-gray-700">Approval Required</p>
            <p className="text-xs text-gray-500">
              Your registration is subject to approval by the host.
            </p>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700 font-semibold mb-3">
                Welcome! To join the event, please register below.
              </p>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                Request to Join
              </button>
            </div>
          </div>

          {/* About Event */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800">About Event</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default EventDetailsPage;
