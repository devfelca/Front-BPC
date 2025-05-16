
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
import FileUploader from "@/components/documents/FileUploader";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

const newsInformativeSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  summary: z.string().min(10, { message: "O resumo deve ter pelo menos 10 caracteres" }),
  content: z.string().min(50, { message: "O conteúdo deve ter pelo menos 50 caracteres" }),
  image: z.any().optional(),
  targetAudience: z.string().min(3, { message: "Informe o público alvo da notícia" }),
});

type NewsInformativeFormValues = z.infer<typeof newsInformativeSchema>;

const NewsInformative: React.FC = () => {
  const form = useForm<NewsInformativeFormValues>({
    resolver: zodResolver(newsInformativeSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      targetAudience: "",
    },
  });

  const onSubmit = (values: NewsInformativeFormValues) => {
    console.log(values);
    toast({
      title: "Notícia criada",
      description: `A notícia "${values.title}" foi criada com sucesso.`,
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
                    Criar Notícia
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
                            <FormLabel>Título da Notícia</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o título da notícia" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resumo</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Breve resumo da notícia"
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Um pequeno resumo que aparecerá na listagem de notícias
                            </FormDescription>
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
                                placeholder="Conteúdo completo da notícia"
                                className="min-h-[250px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imagem (opcional)</FormLabel>
                            <FormControl>
                              <FileUploader 
                                onFilesSelected={(files) => {
                                  if (files && files.length > 0) {
                                    field.onChange(files[0]);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Imagem de destaque para a notícia
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
                              Informe quem deve receber esta notícia
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-4">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                          Publicar Notícia
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

export default NewsInformative;
