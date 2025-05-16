
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";
import { 
  Users, 
  FileText, 
  FolderUp, 
  ChevronRight, 
  BarChart3,
  LayoutDashboard,
  CalendarDays,
  PlusCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DonationsDashboard from "@/components/donations/DonationsDashboard";
import RecentActivityList from "@/components/dashboard/RecentActivityList";
import SystemMetrics from "@/components/dashboard/SystemMetrics";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { Donation } from "@/components/donations/types";

// Mock data for donations that matches the Donation type
const mockDonations: Donation[] = [
  {
    id: "1",
    date: "2025-02-15",
    amount: 500,
    donorName: "João Silva",
    donorType: "associado",
    description: "Doação mensal"
  },
  {
    id: "2",
    date: "2025-03-01",
    amount: 1500,
    donorName: "Maria Souza",
    donorType: "externo",
    description: "Contribuição para evento beneficente"
  },
  {
    id: "3",
    date: "2025-03-10",
    amount: 250,
    donorName: "Carlos Santos",
    donorType: "voluntario",
    description: "Doação voluntária"
  },
  {
    id: "4",
    date: "2025-04-05",
    amount: 750,
    donorName: "Ana Oliveira",
    donorType: "coordenador",
    description: "Contribuição para compra de materiais"
  },
  {
    id: "5",
    date: "2025-04-22",
    amount: 350,
    donorName: "Pedro Costa",
    donorType: "associado",
    description: "Doação para cestas básicas"
  }
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow">
            <main className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
                      <p className="text-gray-600 mt-1">Bem-vindo ao sistema de gestão do Observatório BPC</p>
                    </div>
                    <div className="flex space-x-3">
                      <Button asChild variant="outline">
                        <Link to="/associates">
                          <Users className="mr-2 h-4 w-4" />
                          Ver Associados
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link to="/family-management">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Nova Família
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* System Metrics */}
                <SystemMetrics />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                  {/* Recent Activity - 1/3 width */}
                  <div className="lg:col-span-1">
                    <Card className="h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">Atividades Recentes</CardTitle>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Ver todas <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <RecentActivityList />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Upcoming Events - 1/3 width */}
                  <div className="lg:col-span-1">
                    <Card className="h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">
                            <div className="flex items-center">
                              <CalendarDays className="mr-2 h-5 w-5 text-indigo-600" />
                              Próximos Eventos
                            </div>
                          </CardTitle>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Ver agenda <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <UpcomingEvents />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Links - 1/3 width */}
                  <div className="lg:col-span-1">
                    <Card className="h-full">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-medium">Acesso Rápido</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="grid grid-cols-2 gap-4">
                          <Link to="/document-upload" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <FolderUp className="h-8 w-8 text-indigo-600 mb-2" />
                            <span className="text-sm font-medium text-center">Enviar Documentos</span>
                          </Link>

                          <Link to="/document-approval" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <FileText className="h-8 w-8 text-indigo-600 mb-2" />
                            <span className="text-sm font-medium text-center">Aprovar Documentos</span>
                          </Link>
                          
                          <Link to="/informatives/manage" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <BarChart3 className="h-8 w-8 text-indigo-600 mb-2" />
                            <span className="text-sm font-medium text-center">Informativos</span>
                          </Link>
                          
                          <Link to="/account/profile" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <Users className="h-8 w-8 text-indigo-600 mb-2" />
                            <span className="text-sm font-medium text-center">Perfil</span>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Donations Dashboard */}
                <div className="mt-8">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">
                          <div className="flex items-center">
                            <LayoutDashboard className="mr-2 h-5 w-5 text-indigo-600" />
                            Doações e Contribuições
                          </div>
                        </CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/donations">
                            Ver relatórios <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <DonationsDashboard donations={mockDonations} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Index;
