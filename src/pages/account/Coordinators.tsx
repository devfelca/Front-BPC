
import React, { useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import UserTable, { User } from "@/components/account/UserTable";
import UserForm, { UserFormValues } from "@/components/account/UserForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

// Mock coordinators data
const initialCoordinators: User[] = [
  {
    id: "1",
    name: "Paulo Mendes",
    email: "paulo.mendes@exemplo.com",
    role: "coordinator",
    phone: "(27) 98765-4321",
    address: "Av. Beira Mar, 100 - Vitória, ES"
  },
  {
    id: "2",
    name: "Juliana Campos",
    email: "juliana.campos@exemplo.com",
    role: "coordinator",
    phone: "(47) 99876-5432",
    address: "Rua XV de Novembro, 200 - Blumenau, SC"
  },
  {
    id: "3",
    name: "Ricardo Nunes",
    email: "ricardo.nunes@exemplo.com",
    role: "coordinator",
    phone: "(65) 97777-8888",
    address: "Av. do CPA, 150 - Cuiabá, MT"
  }
];

const Coordinators = () => {
  const [coordinators, setCoordinators] = useState<User[]>(initialCoordinators);
  const [filteredCoordinators, setFilteredCoordinators] = useState<User[]>(initialCoordinators);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCoordinator, setSelectedCoordinator] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term) {
      const filtered = coordinators.filter(
        coordinator => 
          coordinator.name.toLowerCase().includes(term) || 
          coordinator.email.toLowerCase().includes(term) ||
          (coordinator.phone && coordinator.phone.includes(term))
      );
      setFilteredCoordinators(filtered);
    } else {
      setFilteredCoordinators(coordinators);
    }
  };

  const handleAddCoordinator = (values: UserFormValues) => {
    const newCoordinator: User = {
      id: `coordinator-${Date.now()}`,
      name: values.name,
      email: values.email,
      role: "coordinator",
      phone: values.phone,
      address: values.address
    };
    
    const updatedCoordinators = [...coordinators, newCoordinator];
    setCoordinators(updatedCoordinators);
    setFilteredCoordinators(updatedCoordinators);
    setIsAddDialogOpen(false);
    toast({
      title: "Coordenador adicionado",
      description: `${newCoordinator.name} foi adicionado como coordenador.`
    });
  };

  const handleEditCoordinator = (values: UserFormValues) => {
    if (!selectedCoordinator) return;
    
    const updatedCoordinators = coordinators.map(coordinator => 
      coordinator.id === selectedCoordinator.id ? { 
        ...coordinator, 
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address
      } : coordinator
    );
    
    setCoordinators(updatedCoordinators);
    setFilteredCoordinators(updatedCoordinators);
    setIsEditDialogOpen(false);
    setSelectedCoordinator(null);
    toast({
      title: "Coordenador atualizado",
      description: `${values.name} foi atualizado com sucesso.`
    });
  };

  const handleDeleteCoordinator = () => {
    if (!userToDelete) return;
    
    const coordinatorToDelete = coordinators.find(coordinator => coordinator.id === userToDelete);
    const updatedCoordinators = coordinators.filter(coordinator => coordinator.id !== userToDelete);
    
    setCoordinators(updatedCoordinators);
    setFilteredCoordinators(updatedCoordinators);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
    
    if (coordinatorToDelete) {
      toast({
        title: "Coordenador removido",
        description: `${coordinatorToDelete.name} foi removido da lista de coordenadores.`
      });
    }
  };

  const openEditDialog = (coordinator: User) => {
    setSelectedCoordinator(coordinator);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (coordinatorId: string) => {
    setUserToDelete(coordinatorId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AccountLayout 
      title="Coordenadores" 
      description="Gerencie coordenadores responsáveis pelos projetos da ONG."
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-1/2">
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Coordenador
        </Button>
      </div>
      
      <UserTable 
        users={filteredCoordinators} 
        onEdit={openEditDialog} 
        onDelete={openDeleteDialog}
      />
      
      {/* Add Coordinator Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Coordenador</DialogTitle>
          </DialogHeader>
          <UserForm 
            onSubmit={handleAddCoordinator} 
            defaultValues={{ role: "coordinator" }}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Coordinator Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Coordenador</DialogTitle>
          </DialogHeader>
          {selectedCoordinator && (
            <UserForm 
              defaultValues={{
                name: selectedCoordinator.name,
                email: selectedCoordinator.email,
                role: selectedCoordinator.role as "coordinator",
                phone: selectedCoordinator.phone,
                address: selectedCoordinator.address
              }}
              onSubmit={handleEditCoordinator} 
              isEditMode={true}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Coordinator Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Coordenador</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O usuário será removido como coordenador.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCoordinator} className="bg-red-600">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AccountLayout>
  );
};

export default Coordinators;
