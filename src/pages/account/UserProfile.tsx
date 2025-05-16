
import React, { useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import UserForm, { UserFormValues } from "@/components/account/UserForm";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

// Define a more specific type for the roles to match what's expected in UserForm
type UserRole = "admin" | "volunteer" | "associate" | "family_leader" | "coordinator";

// Mock user data
const currentUser = {
  name: "João Silva",
  email: "joao.silva@exemplo.com",
  role: "admin" as UserRole,
  phone: "(11) 98765-4321",
  address: "Rua das Flores, 123 - São Paulo, SP"
};

const UserProfile = () => {
  const [user, setUser] = useState<typeof currentUser>(currentUser);
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Mock search results
  const mockAssociates = [
    { id: "1", name: "Maria Oliveira", email: "maria@exemplo.com", role: "associate" as UserRole },
    { id: "2", name: "Carlos Santos", email: "carlos@exemplo.com", role: "associate" as UserRole },
    { id: "3", name: "Ana Silva", email: "ana@exemplo.com", role: "associate" as UserRole },
  ];
  
  const [searchResults, setSearchResults] = useState(mockAssociates);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filtered = mockAssociates.filter(
        (associate) =>
          associate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          associate.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
      
      if (filtered.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Nenhum associado encontrado com esse termo de busca."
        });
      }
    }
  };

  const selectAssociate = (selectedAssociate: typeof mockAssociates[0]) => {
    setUser({
      ...selectedAssociate,
      phone: "(00) 00000-0000", // Default values for selected associate
      address: "Endereço não cadastrado"
    });
    setShowSearchResults(false);
    setSearchTerm("");
    toast({
      title: "Associado selecionado",
      description: `${selectedAssociate.name} foi selecionado.`
    });
  };

  const handleUpdateProfile = (values: UserFormValues) => {
    // Here you would typically update the user profile through an API
    setUser({
      ...user,
      ...values,
      role: values.role as UserRole
    });
    
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso."
    });

    setIsFormEnabled(false);
  };

  return (
    <AccountLayout 
      title="Perfil do Usuário" 
      description="Visualize e edite suas informações pessoais."
    >
      {/* Barra de busca de associados */}
      <div className="mb-6 flex items-center gap-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Buscar associado por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => setIsFormEnabled(!isFormEnabled)}>
          {isFormEnabled ? "Cancelar" : "Habilitar Edição"}
        </Button>
      </div>
      
      {/* Resultados da busca */}
      {showSearchResults && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">Resultados da Busca</h3>
            <div className="space-y-2">
              {searchResults.map((result) => (
                <div 
                  key={result.id} 
                  className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => selectAssociate(result)}
                >
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-gray-500">{result.email}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Selecionar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <div className="text-sm text-muted-foreground">{user.email}</div>
                <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {user.role === "admin" && "Administrador"}
                  {user.role === "volunteer" && "Voluntário"}
                  {user.role === "associate" && "Associado"}
                  {user.role === "family_leader" && "Líder de Família"}
                  {user.role === "coordinator" && "Coordenador"}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Telefone</Label>
                  <div>{user.phone || "-"}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Endereço</Label>
                  <div>{user.address || "-"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <UserForm 
            defaultValues={user}
            onSubmit={handleUpdateProfile} 
            isEditMode={true}
            disabled={!isFormEnabled}
          />
        </div>
      </div>
    </AccountLayout>
  );
};

export default UserProfile;
