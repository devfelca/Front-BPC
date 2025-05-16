
import { Activity } from "lucide-react";

type ActivityItem = {
  id: string;
  user: string;
  action: string;
  time: string;
  type: "document" | "profile" | "family" | "system";
};

const RecentActivityList = () => {
  // Mock activity data - in a real application these would come from an API
  const activities: ActivityItem[] = [
    {
      id: "1",
      user: "Ana Silva",
      action: "enviou novo documento",
      time: "Há 10 minutos",
      type: "document"
    },
    {
      id: "2",
      user: "Carlos Oliveira",
      action: "atualizou perfil familiar",
      time: "Há 25 minutos",
      type: "family"
    },
    {
      id: "3",
      user: "João Santos",
      action: "aprovou documento pendente",
      time: "Há 1 hora",
      type: "document"
    },
    {
      id: "4",
      user: "Mariana Costa",
      action: "adicionou novo associado",
      time: "Há 2 horas",
      type: "profile"
    },
    {
      id: "5",
      user: "Pedro Souza",
      action: "publicou novo informativo",
      time: "Há 3 horas",
      type: "system"
    },
    {
      id: "6",
      user: "Juliana Lima",
      action: "agendou novo evento",
      time: "Há 5 horas",
      type: "system"
    }
  ];

  // Get icon based on activity type
  const getActivityIcon = (type: ActivityItem["type"]) => {
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="space-y-5">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
          <div className="bg-gray-100 p-1.5 rounded-full mr-3">
            {getActivityIcon(activity.type)}
          </div>
          <div>
            <p className="text-sm">
              <span className="font-medium text-gray-900">{activity.user}</span>{" "}
              <span className="text-gray-600">{activity.action}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivityList;
