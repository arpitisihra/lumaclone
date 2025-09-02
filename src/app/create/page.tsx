'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateEventPage = () => {
  const router = useRouter();
  const [organizerId] = useState('979324c7-1f2b-485f-b2ab-f7586741b173');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !description || !date || !location) {
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    let finalImageUrl: string | undefined = undefined;

    // Upload image to the new backend API if a file was selected
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      const imageUploadToast = toast.loading('Uploading image...');
      try {
        const imageResponse = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error('Image upload failed.');
        }

        const imageData = await imageResponse.json();
        finalImageUrl = imageData.url;
        toast.success('Image uploaded successfully!', { id: imageUploadToast });
      } catch (error) {
        toast.error('Image upload failed. Please try again.', { id: imageUploadToast });
        setLoading(false);
        return;
      }
    }

    // Now submit the event data
    const eventData = {
      title,
      description,
      date,
      location,
      imageUrl: finalImageUrl,
      organizerId,
    };

    const createEventToast = toast.loading('Creating event...');
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event.');
      }

      toast.success('Event created successfully!', { id: createEventToast });
      router.push('/home');
    } catch (error) {
      toast.error('Failed to create event. Please try again.', { id: createEventToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">Event Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your event"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your event"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">Date and Time</label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Online, City Park"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="image" className="text-sm font-medium text-gray-700">Event Image</label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
            />
            {imagePreviewUrl && (
              <div className="mt-4 aspect-video flex justify-center overflow-hidden rounded-md shadow-md">
                <img
                  src={imagePreviewUrl}
                  alt="Image preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-colors ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default CreateEventPage;
