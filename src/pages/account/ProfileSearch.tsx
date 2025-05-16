
import React, { useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type UserRole = "admin" | "volunteer" | "associate" | "family_leader" | "coordinator";

interface Associate {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

// Mock associates data
const mockAssociates: Associate[] = [
  {
    id: "1",
    name: "Maria Oliveira",
    email: "maria@exemplo.com",
    role: "associate",
    phone: "(21) 98765-4321",
    address: "Av. Rio Branco, 123 - Rio de Janeiro, RJ"
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "carlos@exemplo.com",
    role: "associate",
    phone: "(31) 97654-3210",
    address: "Rua dos Ipês, 456 - Belo Horizonte, MG"
  },
  {
    id: "3",
    name: "Ana Silva",
    email: "ana@exemplo.com",
    role: "associate",
    phone: "(41) 99876-5432",
    address: "Av. Paulista, 789 - Curitiba, PR"
  },
  {
    id: "4",
    name: "Roberto Lima",
    email: "roberto@exemplo.com",
    role: "volunteer",
    phone: "(51) 98888-7777",
    address: "Rua das Palmeiras, 321 - Porto Alegre, RS"
  },
  {
    id: "5",
    name: "Fernanda Costa",
    email: "fernanda@exemplo.com",
    role: "family_leader",
    phone: "(85) 97777-6666",
    address: "Av. Beira Mar, 654 - Fortaleza, CE"
  }
];

const ProfileSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Associate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      toast({
        title: "Erro na busca",
        description: "Por favor, insira um termo para buscar."
      });
      return;
    }

    const filtered = mockAssociates.filter(
      (associate) =>
        associate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        associate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (associate.phone && associate.phone.includes(searchTerm))
    );

    setResults(filtered);
    setHasSearched(true);

    if (filtered.length === 0) {
      toast({
        title: "Nenhum resultado",
        description: "Nenhum associado encontrado com esse termo de busca."
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const viewDetails = (id: string) => {
    // Aqui você navegaria para a página de detalhes do perfil
    // Por enquanto, vamos apenas mostrar um toast
    toast({
      title: "Ver detalhes",
      description: `Visualizando perfil do usuário ID: ${id}`
    });
  };

  return (
    <AccountLayout
      title="Buscar Associados"
      description="Encontre e gerencie informações de associados."
    >
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleSearch}>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Resultados da Busca</h3>
            
            {results.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum resultado encontrado para "{searchTerm}"
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((associate) => (
                  <div 
                    key={associate.id}
                    className="border rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{associate.name}</h4>
                          <p className="text-sm text-gray-500">{associate.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewDetails(associate.id)}
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Telefone:</span> {associate.phone || "-"}
                      </div>
                      <div>
                        <span className="text-gray-500">Função:</span> {associate.role === "admin" && "Administrador"}
                        {associate.role === "volunteer" && "Voluntário"}
                        {associate.role === "associate" && "Associado"}
                        {associate.role === "family_leader" && "Líder de Família"}
                        {associate.role === "coordinator" && "Coordenador"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </AccountLayout>
  );
};

export default ProfileSearch;
