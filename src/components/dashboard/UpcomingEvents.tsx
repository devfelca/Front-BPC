
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Event = {
  id: string;
  title: string;
  date: string;
  type: "meeting" | "workshop" | "distribution" | "training";
  location: string;
};

const UpcomingEvents = () => {
  // Mock events data - in a real application these would come from an API
  const events: Event[] = [
    {
      id: "1",
      title: "Distribuição de Cestas Básicas",
      date: "10 Maio, 2025 • 09:00",
      type: "distribution",
      location: "Centro Comunitário"
    },
    {
      id: "2",
      title: "Reunião de Coordenadores",
      date: "12 Maio, 2025 • 14:00",
      type: "meeting",
      location: "Sala de Reuniões"
    },
    {
      id: "3",
      title: "Workshop de Qualificação",
      date: "15 Maio, 2025 • 10:00",
      type: "workshop",
      location: "Auditório Principal"
    },
    {
      id: "4",
      title: "Treinamento de Voluntários",
      date: "18 Maio, 2025 • 09:30",
      type: "training",
      location: "Sala de Treinamento"
    }
  ];

  // Get badge style based on event type
  const getBadgeStyle = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "workshop":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "distribution":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "training":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border-b border-gray-100 pb-4 last:border-0">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium">{event.title}</h4>
            <Badge className={getBadgeStyle(event.type)} variant="outline">
              {event.type === "meeting" && "Reunião"}
              {event.type === "workshop" && "Workshop"}
              {event.type === "distribution" && "Distribuição"}
              {event.type === "training" && "Treinamento"}
            </Badge>
          </div>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <CalendarDays className="h-3.5 w-3.5 mr-1 text-gray-400" />
            {event.date}
          </div>
          <div className="text-xs text-gray-500 mt-1.5">
            {event.location}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
