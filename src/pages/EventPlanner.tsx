import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { demoEvents } from "@/data/demo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function EventPlanner() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="container max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-semibold">Event Planner</h1>
      <p className="text-muted-foreground mt-1">Interactive calendar and agenda (Demo)</p>

      <section className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoEvents.map((e, i) => (
              <div key={i} className="border-b last:border-none pb-3">
                <p className="font-medium text-sm">{e.title}</p>
                <p className="text-xs text-muted-foreground">{new Date(e.date).toLocaleString()} • {e.assigned_agent}</p>
                <p className="text-sm mt-1">{e.description}</p>
              </div>
            ))}
            <Button onClick={() => toast({ title: "New event added (Demo)" })}>Add sample event</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
