
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCheck, Pencil, Trash, Plus, ArrowLeft, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FamilyMemberForm from "@/components/family/FamilyMemberForm";
import { useToast } from "@/components/ui/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

// Mock data - in a real app, this would come from an API
const initialAssociates = [
  {
    id: "1",
    name: "Ana Maria Silva",
    documentId: "123.456.789-00",
  },
  {
    id: "2",
    name: "João Carlos Oliveira",
    documentId: "987.654.321-00",
  },
  {
    id: "3",
    name: "Márcia Rodrigues",
    documentId: "456.789.123-00",
  },
];

const initialFamilyMembers = [
  {
    id: "101",
    associateId: "1",
    name: "Pedro Silva",
    relationship: "spouse",
    age: "45",
    documentId: "111.222.333-44",
    hasBPC: false,
  },
  {
    id: "102",
    associateId: "1",
    name: "Júlia Silva",
    relationship: "child",
    age: "12",
    documentId: "555.666.777-88",
    hasBPC: true,
  },
  {
    id: "201",
    associateId: "2",
    name: "Maria Oliveira",
    relationship: "spouse",
    age: "38",
    documentId: "222.333.444-55",
    hasBPC: false,
  },
];

const relationshipLabels: Record<string, string> = {
  spouse: "Cônjuge",
  child: "Filho(a)",
  parent: "Pai/Mãe",
  sibling: "Irmão/Irmã",
  other: "Outro",
};

const FamilyManagement = () => {
  const [associates] = useState(initialAssociates);
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [selectedAssociateId, setSelectedAssociateId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentFamilyMember, setCurrentFamilyMember] = useState<any>(null);
  
  const location = useLocation();
  const { toast } = useToast();

  // Check if we are coming from an associate's page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const associateId = params.get("associateId");
    if (associateId) {
      setSelectedAssociateId(associateId);
    }
  }, [location.search]);

  const selectedAssociate = selectedAssociateId 
    ? associates.find(a => a.id === selectedAssociateId) 
    : null;

  const associateFamilyMembers = selectedAssociateId
    ? familyMembers.filter(fm => fm.associateId === selectedAssociateId)
    : [];

  const handleAddNew = () => {
    if (!selectedAssociateId) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um associado primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentFamilyMember(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    const memberToEdit = familyMembers.find(m => m.id === id);
    setCurrentFamilyMember(memberToEdit);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
    toast({
      title: "Familiar removido",
      description: "O familiar foi removido com sucesso."
    });
  };

  const handleFormSubmit = (data: any) => {
    if (currentFamilyMember) {
      // Edit existing
      setFamilyMembers(familyMembers.map(m => (m.id === data.id ? data : m)));
    } else {
      // Add new
      setFamilyMembers([...familyMembers, data]);
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <main>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gestão Familiar</h1>
              </div>

              {!selectedAssociateId ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Selecione um Associado</CardTitle>
                    <CardDescription>
                      Escolha um associado para gerenciar os membros da família.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {associates.map((associate) => (
                        <Button
                          key={associate.id}
                          variant="outline"
                          className="w-full justify-start text-left"
                          onClick={() => setSelectedAssociateId(associate.id)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          {associate.name} - CPF: {associate.documentId}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="mb-6">
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        setSelectedAssociateId(null);
                        setShowForm(false);
                      }}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar para lista de associados
                    </Button>
                  </div>

                  {selectedAssociate && (
                    <Card className="mb-8">
                      <CardHeader>
                        <CardTitle>Família de {selectedAssociate.name}</CardTitle>
                        <CardDescription>
                          CPF: {selectedAssociate.documentId}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-end mb-4">
                          <Button onClick={handleAddNew}>
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar Familiar
                          </Button>
                        </div>

                        {showForm ? (
                          <div className="mb-8">
                            <FamilyMemberForm
                              associateId={selectedAssociateId}
                              existingData={currentFamilyMember}
                              onSubmit={handleFormSubmit}
                              onCancel={handleFormCancel}
                            />
                          </div>
                        ) : associateFamilyMembers.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Parentesco</TableHead>
                                <TableHead>Idade</TableHead>
                                <TableHead>CPF</TableHead>
                                <TableHead>BPC</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {associateFamilyMembers.map((member) => (
                                <TableRow key={member.id}>
                                  <TableCell>{member.name}</TableCell>
                                  <TableCell>{relationshipLabels[member.relationship]}</TableCell>
                                  <TableCell>{member.age}</TableCell>
                                  <TableCell>{member.documentId}</TableCell>
                                  <TableCell>
                                    {member.hasBPC ? (
                                      <Badge className="bg-green-600">
                                        <UserCheck className="h-3 w-3 mr-1" />
                                        Sim
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline">Não</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEdit(member.id)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDelete(member.id)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-gray-500">
                              Nenhum familiar cadastrado. Adicione o primeiro familiar.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default FamilyManagement;
