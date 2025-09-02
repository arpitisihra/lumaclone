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

---

### Final Steps: Commit and Push to Deploy 🚀

Once you have made all these changes and saved the files, you can push them to GitHub.

1.  Open your Terminal and navigate to your `lumaclone` project folder.
2.  Run the following commands one by one:

    ```bash
    git add src/app/home/page.tsx src/app/events/[id]/page.tsx src/app/api/events/[id]/route.ts
    git commit -m "Feat: Add event details page and API route"
    git push origin main
    
