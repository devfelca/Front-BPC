
import { Card, CardContent } from "@/components/ui/card";
import { Users, Home, FileText, CalendarDays } from "lucide-react";

const SystemMetrics = () => {
  // Mock metrics data - in a real application these would come from an API
  const metrics = [
    {
      title: "Total de Associados",
      value: "1,284",
      change: "+12.5%",
      increase: true,
      icon: Users,
      color: "bg-indigo-100",
      textColor: "text-indigo-700"
    },
    {
      title: "Famílias Cadastradas",
      value: "342",
      change: "+5.2%",
      increase: true,
      icon: Home,
      color: "bg-green-100",
      textColor: "text-green-700"
    },
    {
      title: "Documentos Pendentes",
      value: "28",
      change: "-3.1%",
      increase: false,
      icon: FileText,
      color: "bg-amber-100",
      textColor: "text-amber-700"
    },
    {
      title: "Eventos do Mês",
      value: "12",
      change: "+2",
      increase: true,
      icon: CalendarDays,
      color: "bg-blue-100",
      textColor: "text-blue-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-full ${metric.color}`}>
                <metric.icon className={`h-6 w-6 ${metric.textColor}`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-xs font-medium ${metric.increase ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
              <span className="text-xs text-gray-500 ml-1">desde o último mês</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SystemMetrics;
