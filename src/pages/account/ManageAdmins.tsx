
import React, { useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import UserTable, { User } from "@/components/account/UserTable";
import UserForm, { UserFormValues } from "@/components/account/UserForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PlusCircle } from "lucide-react";

// Mock admin data
const initialAdmins: User[] = [
  {
    id: "1",
    name: "Carlos Mendes",
    email: "carlos.mendes@exemplo.com",
    role: "admin",
    phone: "(11) 98765-4321"
  },
  {
    id: "2",
    name: "Ana Silva",
    email: "ana.silva@exemplo.com",
    role: "admin",
    phone: "(21) 99876-5432"
  }
];

const ManageAdmins = () => {
  const [admins, setAdmins] = useState<User[]>(initialAdmins);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleAddAdmin = (values: UserFormValues) => {
    const newAdmin: User = {
      id: `admin-${Date.now()}`,
      name: values.name,
      email: values.email,
      role: "admin",
      phone: values.phone,
      address: values.address
    };
    
    setAdmins([...admins, newAdmin]);
    setIsAddDialogOpen(false);
    toast({
      title: "Administrador adicionado",
      description: `${newAdmin.name} foi adicionado como administrador.`
    });
  };

  const handleEditAdmin = (values: UserFormValues) => {
    if (!selectedAdmin) return;
    
    const updatedAdmins = admins.map(admin => 
      admin.id === selectedAdmin.id ? { 
        ...admin, 
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address
      } : admin
    );
    
    setAdmins(updatedAdmins);
    setIsEditDialogOpen(false);
    setSelectedAdmin(null);
    toast({
      title: "Administrador atualizado",
      description: `${values.name} foi atualizado com sucesso.`
    });
  };

  const handleDeleteAdmin = () => {
    if (!userToDelete) return;
    
    const adminToDelete = admins.find(admin => admin.id === userToDelete);
    const updatedAdmins = admins.filter(admin => admin.id !== userToDelete);
    
    setAdmins(updatedAdmins);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
    
    if (adminToDelete) {
      toast({
        title: "Administrador removido",
        description: `${adminToDelete.name} foi removido da lista de administradores.`
      });
    }
  };

  const openEditDialog = (admin: User) => {
    setSelectedAdmin(admin);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (adminId: string) => {
    setUserToDelete(adminId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AccountLayout 
      title="Gerenciar Administradores" 
      description="Adicione, edite ou remova administradores do sistema."
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Administradores</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Administrador
        </Button>
      </div>
      
      <UserTable 
        users={admins} 
        onEdit={openEditDialog} 
        onDelete={openDeleteDialog}
      />
      
      {/* Add Admin Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Administrador</DialogTitle>
          </DialogHeader>
          <UserForm 
            onSubmit={handleAddAdmin} 
            defaultValues={{ role: "admin" }}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Admin Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Administrador</DialogTitle>
          </DialogHeader>
          {selectedAdmin && (
            <UserForm 
              defaultValues={{
                name: selectedAdmin.name,
                email: selectedAdmin.email,
                role: selectedAdmin.role as "admin",
                phone: selectedAdmin.phone,
                address: selectedAdmin.address
              }}
              onSubmit={handleEditAdmin} 
              isEditMode={true}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Admin Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Administrador</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O usuário perderá todos os acessos de administrador.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAdmin} className="bg-red-600">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AccountLayout>
  );
};

export default ManageAdmins;
