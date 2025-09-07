import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: any) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
    }
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error('Error fetching single event:', error);
    return NextResponse.json({ message: 'Failed to fetch event details' }, { status: 500 });
  }
}
