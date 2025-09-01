import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// API Route to handle POST requests for creating events
export async function POST(req: Request) {
  try {
    const { title, description, date, location, organizerId } = await req.json();

    if (!title || !description || !date || !location || !organizerId) {
      return NextResponse.json({ message: 'Missing required event fields' }, { status: 400 });
    }

    // Create the event in the database using Prisma
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        organizerId,
      },
    });

    return NextResponse.json({ message: 'Event created successfully!', event: newEvent }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Failed to create event', error: (error as Error).message }, { status: 500 });
  }
}

// API Route to handle GET requests for events
export async function GET() {
  try {
    // Fetch all events from the database
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc', // Order by date, from oldest to newest
      },
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events', error: (error as Error).message }, { status: 500 });
  }
}
