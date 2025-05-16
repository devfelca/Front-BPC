
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

// Mock family leaders data
const initialFamilyLeaders: User[] = [
  {
    id: "1",
    name: "José Pereira",
    email: "jose.pereira@exemplo.com",
    role: "family_leader",
    phone: "(92) 98765-4321",
    address: "Rua Amazonas, 123 - Manaus, AM"
  },
  {
    id: "2",
    name: "Maria Souza",
    email: "maria.souza@exemplo.com",
    role: "family_leader",
    phone: "(91) 99876-5432",
    address: "Av. Nazaré, 456 - Belém, PA"
  }
];

const FamilyLeaders = () => {
  const [familyLeaders, setFamilyLeaders] = useState<User[]>(initialFamilyLeaders);
  const [filteredFamilyLeaders, setFilteredFamilyLeaders] = useState<User[]>(initialFamilyLeaders);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term) {
      const filtered = familyLeaders.filter(
        leader => 
          leader.name.toLowerCase().includes(term) || 
          leader.email.toLowerCase().includes(term) ||
          (leader.phone && leader.phone.includes(term))
      );
      setFilteredFamilyLeaders(filtered);
    } else {
      setFilteredFamilyLeaders(familyLeaders);
    }
  };

  const handleAddLeader = (values: UserFormValues) => {
    const newLeader: User = {
      id: `family-leader-${Date.now()}`,
      name: values.name,
      email: values.email,
      role: "family_leader",
      phone: values.phone,
      address: values.address
    };
    
    const updatedLeaders = [...familyLeaders, newLeader];
    setFamilyLeaders(updatedLeaders);
    setFilteredFamilyLeaders(updatedLeaders);
    setIsAddDialogOpen(false);
    toast({
      title: "Líder de família adicionado",
      description: `${newLeader.name} foi adicionado como líder de família.`
    });
  };

  const handleEditLeader = (values: UserFormValues) => {
    if (!selectedLeader) return;
    
    const updatedLeaders = familyLeaders.map(leader => 
      leader.id === selectedLeader.id ? { 
        ...leader, 
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address
      } : leader
    );
    
    setFamilyLeaders(updatedLeaders);
    setFilteredFamilyLeaders(updatedLeaders);
    setIsEditDialogOpen(false);
    setSelectedLeader(null);
    toast({
      title: "Líder de família atualizado",
      description: `${values.name} foi atualizado com sucesso.`
    });
  };

  const handleDeleteLeader = () => {
    if (!userToDelete) return;
    
    const leaderToDelete = familyLeaders.find(leader => leader.id === userToDelete);
    const updatedLeaders = familyLeaders.filter(leader => leader.id !== userToDelete);
    
    setFamilyLeaders(updatedLeaders);
    setFilteredFamilyLeaders(updatedLeaders);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
    
    if (leaderToDelete) {
      toast({
        title: "Líder de família removido",
        description: `${leaderToDelete.name} foi removido da lista de líderes de família.`
      });
    }
  };

  const openEditDialog = (leader: User) => {
    setSelectedLeader(leader);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (leaderId: string) => {
    setUserToDelete(leaderId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AccountLayout 
      title="Líderes de Família" 
      description="Gerencie líderes de famílias assistidas pela ONG."
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
          Adicionar Líder de Família
        </Button>
      </div>
      
      <UserTable 
        users={filteredFamilyLeaders} 
        onEdit={openEditDialog} 
        onDelete={openDeleteDialog}
      />
      
      {/* Add Family Leader Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Líder de Família</DialogTitle>
          </DialogHeader>
          <UserForm 
            onSubmit={handleAddLeader} 
            defaultValues={{ role: "family_leader" }}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Family Leader Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Líder de Família</DialogTitle>
          </DialogHeader>
          {selectedLeader && (
            <UserForm 
              defaultValues={{
                name: selectedLeader.name,
                email: selectedLeader.email,
                role: selectedLeader.role as "family_leader",
                phone: selectedLeader.phone,
                address: selectedLeader.address
              }}
              onSubmit={handleEditLeader} 
              isEditMode={true}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Family Leader Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Líder de Família</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O usuário será removido como líder de família.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLeader} className="bg-red-600">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AccountLayout>
  );
};

export default FamilyLeaders;
