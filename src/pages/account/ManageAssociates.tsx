
import React, { useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import UserTable, { User } from "@/components/account/UserTable";
import UserForm, { UserFormValues } from "@/components/account/UserForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock associates data
const initialAssociates: User[] = [
  {
    id: "1",
    name: "Rodrigo Santos",
    email: "rodrigo.santos@exemplo.com",
    role: "associate",
    phone: "(85) 98765-1234",
    address: "Rua dos Girassóis, 321 - Fortaleza, CE"
  },
  {
    id: "2",
    name: "Fernanda Lima",
    email: "fernanda.lima@exemplo.com",
    role: "associate",
    phone: "(71) 99876-5432",
    address: "Avenida das Palmeiras, 456 - Salvador, BA"
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@exemplo.com",
    role: "associate",
    phone: "(81) 97654-3210",
    address: "Rua das Flores, 789 - Recife, PE"
  },
  {
    id: "4",
    name: "Camila Rocha",
    email: "camila.rocha@exemplo.com",
    role: "associate",
    phone: "(61) 98888-7777",
    address: "Setor QNL, 45 - Brasília, DF"
  }
];

const ManageAssociates = () => {
  const [associates, setAssociates] = useState<User[]>(initialAssociates);
  const [filteredAssociates, setFilteredAssociates] = useState<User[]>(initialAssociates);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAssociate, setSelectedAssociate] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term) {
      const filtered = associates.filter(
        associate => 
          associate.name.toLowerCase().includes(term) || 
          associate.email.toLowerCase().includes(term) ||
          (associate.phone && associate.phone.includes(term))
      );
      setFilteredAssociates(filtered);
    } else {
      setFilteredAssociates(associates);
    }
  };

  const handleAddAssociate = (values: UserFormValues) => {
    const newAssociate: User = {
      id: `associate-${Date.now()}`,
      name: values.name,
      email: values.email,
      role: "associate",
      phone: values.phone,
      address: values.address
    };
    
    const updatedAssociates = [...associates, newAssociate];
    setAssociates(updatedAssociates);
    setFilteredAssociates(updatedAssociates);
    setIsAddDialogOpen(false);
    toast({
      title: "Associado adicionado",
      description: `${newAssociate.name} foi adicionado como associado.`
    });
  };

  const handleEditAssociate = (values: UserFormValues) => {
    if (!selectedAssociate) return;
    
    const updatedAssociates = associates.map(associate => 
      associate.id === selectedAssociate.id ? { 
        ...associate, 
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address
      } : associate
    );
    
    setAssociates(updatedAssociates);
    setFilteredAssociates(updatedAssociates);
    setIsEditDialogOpen(false);
    setSelectedAssociate(null);
    toast({
      title: "Associado atualizado",
      description: `${values.name} foi atualizado com sucesso.`
    });
  };

  const handleDeleteAssociate = () => {
    if (!userToDelete) return;
    
    const associateToDelete = associates.find(associate => associate.id === userToDelete);
    const updatedAssociates = associates.filter(associate => associate.id !== userToDelete);
    
    setAssociates(updatedAssociates);
    setFilteredAssociates(updatedAssociates);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
    
    if (associateToDelete) {
      toast({
        title: "Associado removido",
        description: `${associateToDelete.name} foi removido da lista de associados.`
      });
    }
  };

  const openEditDialog = (associate: User) => {
    setSelectedAssociate(associate);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (associateId: string) => {
    setUserToDelete(associateId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AccountLayout 
      title="Gerenciar Associados" 
      description="Adicione, edite ou remova associados do sistema."
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
          Adicionar Associado
        </Button>
      </div>
      
      <UserTable 
        users={filteredAssociates} 
        onEdit={openEditDialog} 
        onDelete={openDeleteDialog}
      />
      
      {/* Add Associate Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Associado</DialogTitle>
          </DialogHeader>
          <UserForm 
            onSubmit={handleAddAssociate} 
            defaultValues={{ role: "associate" }}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Associate Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Associado</DialogTitle>
          </DialogHeader>
          {selectedAssociate && (
            <UserForm 
              defaultValues={{
                name: selectedAssociate.name,
                email: selectedAssociate.email,
                role: selectedAssociate.role as "associate",
                phone: selectedAssociate.phone,
                address: selectedAssociate.address
              }}
              onSubmit={handleEditAssociate} 
              isEditMode={true}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Associate Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Associado</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O usuário será removido da lista de associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAssociate} className="bg-red-600">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AccountLayout>
  );
};

export default ManageAssociates;
