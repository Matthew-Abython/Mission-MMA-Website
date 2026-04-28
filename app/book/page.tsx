import { BookingCalendar } from "@/components/ui/booking-calendar";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book Your Free Trial Class",
  description:
    "Schedule your free first class at Mission MMA in Chicago. Free trials available Mondays (Muay Thai 5:30 PM) and Thursdays (BJJ 7:30 PM).",
  path: "/book",
});

export default function BookPage() {
  return (
    <main className="min-h-screen bg-mission-black pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl uppercase text-mission-white mb-3">
            Book Your First Class
          </h1>
          <p className="text-mission-gray-300 text-lg">
            Free trials available Mondays (Muay Thai) and Thursdays (BJJ). Select a date to get started.
          </p>
        </div>
        <BookingCalendar />
      </div>
    </main>
  );
}
