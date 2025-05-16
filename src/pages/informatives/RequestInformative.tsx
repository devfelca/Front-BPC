
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { FileArchive } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

const requestInformativeSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "A prioridade da requisição é obrigatória",
  }),
  deadline: z.string().optional(),
  targetAudience: z.string().min(3, { message: "Informe o público alvo da requisição" }),
});

type RequestInformativeFormValues = z.infer<typeof requestInformativeSchema>;

const RequestInformative: React.FC = () => {
  const form = useForm<RequestInformativeFormValues>({
    resolver: zodResolver(requestInformativeSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      deadline: "",
      targetAudience: "",
    },
  });

  const onSubmit = (values: RequestInformativeFormValues) => {
    console.log(values);
    toast({
      title: "Requisição criada",
      description: `A requisição "${values.title}" foi criada com sucesso.`,
    });
    form.reset();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <main>
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <FileArchive className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-2xl font-bold text-indigo-600">
                    Criar Requisição
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
                            <FormLabel>Título da Requisição</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o título da requisição" {...field} />
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
                                placeholder="Descreva detalhadamente o que está sendo requisitado"
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Prioridade</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-6"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="low" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-green-600">
                                    Baixa
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="medium" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-yellow-600">
                                    Média
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="high" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-red-600">
                                    Alta
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prazo (opcional)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>
                              Data limite para atender a requisição
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
                              Informe quem deve receber esta requisição
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-4">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                          Criar Requisição
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default RequestInformative;
