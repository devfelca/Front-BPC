
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
import { FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

const textInformativeSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  content: z.string().min(10, { message: "O conteúdo deve ter pelo menos 10 caracteres" }),
  targetAudience: z.string().min(3, { message: "Informe o público alvo do informativo" }),
});

type TextInformativeFormValues = z.infer<typeof textInformativeSchema>;

const TextInformative: React.FC = () => {
  const form = useForm<TextInformativeFormValues>({
    resolver: zodResolver(textInformativeSchema),
    defaultValues: {
      title: "",
      content: "",
      targetAudience: "",
    },
  });

  const onSubmit = (values: TextInformativeFormValues) => {
    console.log(values);
    toast({
      title: "Informativo criado",
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
          <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <main>
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-2xl font-bold text-indigo-600">
                    Criar Informativo de Texto
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
                            <FormLabel>Título do Informativo</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o título do informativo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Conteúdo</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Digite o conteúdo do informativo"
                                className="min-h-[200px]"
                                {...field}
                              />
                            </FormControl>
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
                              Informe quem deve receber este informativo
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-4">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                          Criar Informativo
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

export default TextInformative;
