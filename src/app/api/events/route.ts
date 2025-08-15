// src/app/api/events/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // Import Prisma Client

const prisma = new PrismaClient(); // Initialize Prisma Client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, date, location, imageUrl, organizerId } = body;

    // Basic validation (you'd add more robust validation with Zod later)
    if (!title || !description || !date || !location || !organizerId) {
      return NextResponse.json({ message: 'Missing required event fields' }, { status: 400 });
    }

    // Convert date string to a Date object if necessary
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

    return NextResponse.json({ message: 'Event created successfully', event: newEvent }, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Error creating event:', error);
    // Handle specific Prisma errors or other errors
    return NextResponse.json({ message: 'Failed to create event', error: (error as Error).message }, { status: 500 });
  }
}

// You might also want a GET route here to list events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc', // Order by date, ascending
      },
    });
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events', error: (error as Error).message }, { status: 500 });
  }
}
