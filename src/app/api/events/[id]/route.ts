import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
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
```

### Next Steps: Apply, Commit, and Push 🚀
Once you have replaced the content of your `route.ts` file with the code above and saved it, you can push the changes to GitHub.

1.  Open your Terminal and navigate to your `lumaclone` project folder.
2.  Run the following commands one by one:
    ```bash
    git add src/app/api/events/[id]/route.ts
    ```
    ```bash
    git commit -m "Fix: Remove markdown formatting from events API route"
    ```
    ```bash
    git push origin main
    
