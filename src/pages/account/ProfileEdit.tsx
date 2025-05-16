
import React, { useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import UserForm, { UserFormValues } from "@/components/account/UserForm";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

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

const ProfileEdit = () => {
  const [user] = useState<typeof currentUser>(currentUser);

  const handleUpdateProfile = (values: UserFormValues) => {
    // Here you would typically update the user profile through an API
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso."
    });
  };

  return (
    <AccountLayout 
      title="Editar Perfil" 
      description="Edite suas informações pessoais."
    >
      <Card>
        <CardContent className="pt-6">
          <UserForm 
            defaultValues={user}
            onSubmit={handleUpdateProfile} 
            isEditMode={true}
          />
        </CardContent>
      </Card>
    </AccountLayout>
  );
};

export default ProfileEdit;
