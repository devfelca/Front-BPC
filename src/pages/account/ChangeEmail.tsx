
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AccountLayout from "@/components/layout/AccountLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const changeEmailSchema = z.object({
  currentEmail: z.string().email("Email atual inválido"),
  newEmail: z.string().email("Novo email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type ChangeEmailValues = z.infer<typeof changeEmailSchema>;

const ChangeEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  
  // Mock current user email
  const currentEmail = "usuario@exemplo.com";
  
  const form = useForm<ChangeEmailValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      currentEmail: currentEmail,
      newEmail: "",
      password: "",
    },
  });

  const onSubmit = (values: ChangeEmailValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Email alterado",
        description: `Seu email foi alterado para ${values.newEmail}. Um email de verificação foi enviado.`,
      });
      form.reset({
        currentEmail: values.newEmail,
        newEmail: "",
        password: "",
      });
      setIsSubmitting(false);
      setIsFormEnabled(false);
    }, 1000);
  };

  return (
    <AccountLayout 
      title="Alterar Email" 
      description="Atualize seu endereço de email associado à conta."
    >
      <div className="mb-4 flex justify-end">
        <Button
          onClick={() => setIsFormEnabled(!isFormEnabled)}
          variant="outline"
          className="text-indigo-600 border-indigo-600"
        >
          {isFormEnabled ? "Cancelar" : "Habilitar Edição"}
        </Button>
      </div>
    
      <div className="max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Atual</FormLabel>
                  <FormControl>
                    <Input type="email" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Novo Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Digite o novo email" 
                      disabled={!isFormEnabled} 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Um email de verificação será enviado ao novo endereço.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Digite sua senha para confirmar" 
                      disabled={!isFormEnabled}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !isFormEnabled}
            >
              {isSubmitting ? "Alterando..." : "Alterar Email"}
            </Button>
          </form>
        </Form>
      </div>
    </AccountLayout>
  );
};

export default ChangeEmail;
