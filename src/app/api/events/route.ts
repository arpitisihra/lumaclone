// src/app/api/events/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assumes you have a configured Prisma client instance

export async function GET() {
  try {
    // Fetch all events from the database
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

export async function POST(req: Request) {
  try {
    const { title, description, date, location, imageUrl, organizerId } = await req.json();

    // Create the event in the database using Prisma
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
    // Handle specific Prisma errors or other errors
    return NextResponse.json({ message: 'Failed to create event', error: (error as Error).message }, { status: 500 });
  }
}
