
import React, { useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import UserTable, { User } from "@/components/account/UserTable";
import UserForm, { UserFormValues } from "@/components/account/UserForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PlusCircle } from "lucide-react";

// Mock volunteer data
const initialVolunteers: User[] = [
  {
    id: "1",
    name: "Roberto Almeida",
    email: "roberto.almeida@exemplo.com",
    role: "volunteer",
    phone: "(31) 98888-7777",
    address: "Avenida Central, 500 - Belo Horizonte, MG"
  },
  {
    id: "2",
    name: "Mariana Costa",
    email: "mariana.costa@exemplo.com",
    role: "volunteer",
    phone: "(41) 99999-8888"
  },
  {
    id: "3",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@exemplo.com",
    role: "volunteer",
    phone: "(51) 97777-6666"
  }
];

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState<User[]>(initialVolunteers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleAddVolunteer = (values: UserFormValues) => {
    const newVolunteer: User = {
      id: `volunteer-${Date.now()}`,
      name: values.name,
      email: values.email,
      role: "volunteer",
      phone: values.phone,
      address: values.address
    };
    
    setVolunteers([...volunteers, newVolunteer]);
    setIsAddDialogOpen(false);
    toast({
      title: "Voluntário adicionado",
      description: `${newVolunteer.name} foi adicionado como voluntário.`
    });
  };

  const handleEditVolunteer = (values: UserFormValues) => {
    if (!selectedVolunteer) return;
    
    const updatedVolunteers = volunteers.map(volunteer => 
      volunteer.id === selectedVolunteer.id ? { 
        ...volunteer, 
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address
      } : volunteer
    );
    
    setVolunteers(updatedVolunteers);
    setIsEditDialogOpen(false);
    setSelectedVolunteer(null);
    toast({
      title: "Voluntário atualizado",
      description: `${values.name} foi atualizado com sucesso.`
    });
  };

  const handleDeleteVolunteer = () => {
    if (!userToDelete) return;
    
    const volunteerToDelete = volunteers.find(volunteer => volunteer.id === userToDelete);
    const updatedVolunteers = volunteers.filter(volunteer => volunteer.id !== userToDelete);
    
    setVolunteers(updatedVolunteers);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
    
    if (volunteerToDelete) {
      toast({
        title: "Voluntário removido",
        description: `${volunteerToDelete.name} foi removido da lista de voluntários.`
      });
    }
  };

  const openEditDialog = (volunteer: User) => {
    setSelectedVolunteer(volunteer);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (volunteerId: string) => {
    setUserToDelete(volunteerId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AccountLayout 
      title="Gerenciar Voluntários" 
      description="Adicione, edite ou remova voluntários do sistema."
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Voluntários</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Voluntário
        </Button>
      </div>
      
      <UserTable 
        users={volunteers} 
        onEdit={openEditDialog} 
        onDelete={openDeleteDialog}
      />
      
      {/* Add Volunteer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Voluntário</DialogTitle>
          </DialogHeader>
          <UserForm 
            onSubmit={handleAddVolunteer} 
            defaultValues={{ role: "volunteer" }}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Volunteer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Voluntário</DialogTitle>
          </DialogHeader>
          {selectedVolunteer && (
            <UserForm 
              defaultValues={{
                name: selectedVolunteer.name,
                email: selectedVolunteer.email,
                role: selectedVolunteer.role as "volunteer",
                phone: selectedVolunteer.phone,
                address: selectedVolunteer.address
              }}
              onSubmit={handleEditVolunteer} 
              isEditMode={true}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Volunteer Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Voluntário</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O usuário será removido da lista de voluntários.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteVolunteer} className="bg-red-600">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AccountLayout>
  );
};

export default ManageVolunteers;
