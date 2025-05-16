
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
import { toast } from "@/hooks/use-toast";
import { File } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FileUploader from "@/components/documents/FileUploader";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

const fileInformativeSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  targetAudience: z.string().min(3, { message: "Informe o público alvo do informativo" }),
  file: z.any().optional(),
});

type FileInformativeFormValues = z.infer<typeof fileInformativeSchema>;

const FileInformative: React.FC = () => {
  const form = useForm<FileInformativeFormValues>({
    resolver: zodResolver(fileInformativeSchema),
    defaultValues: {
      title: "",
      description: "",
      targetAudience: "",
    },
  });

  const onSubmit = (values: FileInformativeFormValues) => {
    console.log(values);
    toast({
      title: "Informativo de arquivo criado",
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
                  <File className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-2xl font-bold text-indigo-600">
                    Criar Informativo com Arquivo
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Input placeholder="Breve descrição do arquivo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Arquivo</FormLabel>
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
                              Carregue o arquivo que deseja compartilhar
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

export default FileInformative;
