import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
  });

  if (!event) return notFound();

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      {/* Top banner */}
      <div className="w-full border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 py-8 px-4">
          
          {/* LEFT COLUMN (fixed width like Luma ~420px) */}
          <div className="w-full md:w-[420px] flex-shrink-0">
            <img
              src={event.imageUrl || "https://placehold.co/420x420/FFF/000?text=Event+Image"}
              alt={event.title}
              className="w-[420px] h-[420px] object-cover rounded-xl border"
            />

            <div className="mt-4">
              <h3 className="font-semibold text-sm text-gray-500">Hosted By</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  {event.host?.charAt(0) || "H"}
                </div>
                <p className="font-medium">{event.host || "Unknown Host"}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>{event.attendees?.length || 0} Going</p>
              {/* Render small circles like Luma */}
              <div className="mt-2 flex -space-x-2">
                {event.attendees?.slice(0, 4).map((att: any, i: number) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (content area) */}
          <div className="flex-1">
            {/* Featured Tag */}
            <div className="text-sm text-purple-600 font-medium mb-2">
              Featured in #Web3 Events
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold">{event.title}</h1>

            {/* Date & Time */}
            <div className="mt-4 flex items-center gap-3 text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-medium">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  {new Date(event.date).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* Register CTA */}
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h2 className="font-semibold text-lg">Registration</h2>
              <p className="text-sm text-gray-600 mt-1">
                Approval Required – Your registration is subject to host approval.
              </p>
              <button className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium">
                Request to Join
              </button>
            </div>

            {/* About Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold">About Event</h2>
              <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}