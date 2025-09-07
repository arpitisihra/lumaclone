import { NextResponse } from 'next/server';
import { RouteContext } from 'next/dist/server/app-render'; // only if you need it explicitly, usually it's globally available
import prisma from '@/lib/prisma';

export async function GET(
  req: Request,
  ctx: RouteContext<'/api/events/[id]'>
) {
  const { id } = ctx.params;

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
}
