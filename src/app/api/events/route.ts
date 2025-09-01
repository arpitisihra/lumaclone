import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assumes you have a configured Prisma client instance

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

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        imageUrl,
        organizerId,
      },
    });

    return NextResponse.json({ message: 'Event created successfully!', event: newEvent }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
