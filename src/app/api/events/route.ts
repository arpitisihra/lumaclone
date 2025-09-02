import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// API Route to handle GET requests for events
export async function GET() {
  try {
    // Fetch all events from the database
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc', // Order by date, from oldest to newest
      },
      // You can add 'include' or 'select' to retrieve related data if needed
    });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// API Route to handle POST requests for creating events
export async function POST(req: Request) {
  try {
    const { title, description, date, location, imageUrl, organizerId } = await req.json();

    // Basic validation (you'd add more robust validation with Zod later)
    if (!title || !description || !date || !location || !organizerId) {
      return NextResponse.json({ message: 'Missing required event fields' }, { status: 400 });
    }

    // Convert date string to a Date object
    const eventDate = new Date(date);

    // Create the event in the database using Prisma
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: eventDate,
        location,
        imageUrl, // Optional: if an image was uploaded
        organizerId, // Link to the user who created the event
      },
    });

    return NextResponse.json({ message: 'Event created successfully!', event: newEvent }, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('Error creating event:', error);
    // Handle specific Prisma errors or other errors
    return NextResponse.json({ message: 'Failed to create event', error: (error as Error).message }, { status: 500 });
  }
}
