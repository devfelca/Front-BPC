import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Coins, Users, LayoutDashboard } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import AssociateCard from "@/components/associates/AssociateCard";
import AssociateForm from "@/components/associates/AssociateForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonationsManagement from "@/components/donations/DonationsManagement";
import DonationsDashboard from "@/components/donations/DonationsDashboard";
import { initialDonations } from "@/components/donations/types";

// Mock data - in a real app, this would come from an API
const initialAssociates = [
  {
    id: "1",
    name: "Ana Maria Silva",
    documentId: "123.456.789-00",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    hasBPC: true,
    familySize: 3,
  },
  {
    id: "2",
    name: "João Carlos Oliveira",
    documentId: "987.654.321-00",
    phone: "(11) 91234-5678",
    address: "Av. Principal, 456",
    hasBPC: false,
    familySize: 2,
  },
  {
    id: "3",
    name: "Márcia Rodrigues",
    documentId: "456.789.123-00",
    phone: "(11) 93456-7890",
    address: "Rua Sete, 789",
    hasBPC: true,
    familySize: 4,
  },
];

const Associates = () => {
  const [associates, setAssociates] = useState(initialAssociates);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBPC, setFilterBPC] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [currentAssociate, setCurrentAssociate] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("associates");
  
  const navigate = useNavigate();

  const filteredAssociates = associates.filter((associate) => {
    const matchesSearch = associate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         associate.documentId.includes(searchTerm);
    
    if (filterBPC === "all") return matchesSearch;
    if (filterBPC === "yes") return matchesSearch && associate.hasBPC;
    return matchesSearch && !associate.hasBPC;
  });

  const handleAddNew = () => {
    setCurrentAssociate(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    const associateToEdit = associates.find((a) => a.id === id);
    setCurrentAssociate(associateToEdit);
    setShowForm(true);
  };

  const handleFormSubmit = (data: any) => {
    if (currentAssociate) {
      // Edit existing
      setAssociates(associates.map((a) => (a.id === data.id ? data : a)));
    } else {
      // Add new
      setAssociates([...associates, { ...data, familySize: 1 }]);
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleViewFamily = (id: string) => {
    navigate(`/family-management?associateId=${id}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Gestão de Associados</h1>
              {activeTab === "associates" && (
                <Button onClick={handleAddNew}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Associado
                </Button>
              )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="associates" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Associados
                </TabsTrigger>
                <TabsTrigger value="donations" className="flex items-center">
                  <Coins className="mr-2 h-4 w-4" />
                  Doações
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="associates">
                {showForm ? (
                  <div className="mb-8">
                    <AssociateForm 
                      existingData={currentAssociate}
                      onSubmit={handleFormSubmit}
                      onCancel={handleFormCancel}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          placeholder="Buscar por nome ou CPF..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="w-full md:w-64">
                        <Select value={filterBPC} onValueChange={setFilterBPC}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filtrar por BPC" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="yes">Com BPC</SelectItem>
                            <SelectItem value="no">Sem BPC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {filteredAssociates.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAssociates.map((associate) => (
                          <AssociateCard
                            key={associate.id}
                            {...associate}
                            onEdit={handleEdit}
                            onViewFamily={handleViewFamily}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">Nenhum associado encontrado.</p>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="donations">
                <DonationsManagement />
              </TabsContent>

              <TabsContent value="dashboard">
                <DonationsDashboard donations={initialDonations} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Associates;
