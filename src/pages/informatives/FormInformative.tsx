
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ClipboardList } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

const formInformativeSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  formFields: z.string().min(10, { message: "Os campos do formulário devem ser especificados" }),
  targetAudience: z.string().min(3, { message: "Informe o público alvo do informativo" }),
});

type FormInformativeFormValues = z.infer<typeof formInformativeSchema>;

const FormInformative: React.FC = () => {
  const form = useForm<FormInformativeFormValues>({
    resolver: zodResolver(formInformativeSchema),
    defaultValues: {
      title: "",
      description: "",
      formFields: "",
      targetAudience: "",
    },
  });

  const onSubmit = (values: FormInformativeFormValues) => {
    console.log(values);
    toast({
      title: "Informativo com formulário criado",
      description: `O informativo "${values.title}" foi criado com sucesso.`,
    });
    form.reset();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Card>
              <CardHeader className="flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-indigo-600" />
                <CardTitle className="text-2xl font-bold text-indigo-600">
                  Criar Informativo com Formulário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título do Formulário</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o título do formulário" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva o objetivo deste formulário"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="formFields"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campos do Formulário</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Digite os campos que o formulário deve ter, um por linha. Ex: Nome (texto), Idade (número), etc."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Liste os campos que deseja incluir no formulário
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="targetAudience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Público Alvo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Associados, Voluntários, Todos" {...field} />
                          </FormControl>
                          <FormDescription>
                            Informe quem deve receber este formulário
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-4">
                      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                        Criar Formulário
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default FormInformative;
