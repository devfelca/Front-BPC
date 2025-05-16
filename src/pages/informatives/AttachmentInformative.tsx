
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
import { Paperclip } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FileUploader from "@/components/documents/FileUploader";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

const attachmentInformativeSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  category: z.string().min(3, { message: "Informe a categoria do anexo" }),
  files: z.any().optional(),
  targetAudience: z.string().min(3, { message: "Informe o público alvo deste anexo" }),
});

type AttachmentInformativeFormValues = z.infer<typeof attachmentInformativeSchema>;

const AttachmentInformative: React.FC = () => {
  const form = useForm<AttachmentInformativeFormValues>({
    resolver: zodResolver(attachmentInformativeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      targetAudience: "",
    },
  });

  const onSubmit = (values: AttachmentInformativeFormValues) => {
    console.log(values);
    toast({
      title: "Anexo criado",
      description: `O anexo "${values.title}" foi criado com sucesso.`,
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
                  <Paperclip className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-2xl font-bold text-indigo-600">
                    Criar Anexo
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
                            <FormLabel>Título do Anexo</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o título do anexo" {...field} />
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
                                placeholder="Descreva o conteúdo deste anexo"
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
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Documentos, Relatórios, Instruções" {...field} />
                            </FormControl>
                            <FormDescription>
                              Categoria para ajudar a organizar os anexos
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="files"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Arquivos para anexar</FormLabel>
                            <FormControl>
                              <FileUploader 
                                multiple={true}
                                onFilesSelected={(files) => {
                                  if (files && files.length > 0) {
                                    field.onChange(files);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Selecione um ou mais arquivos para anexar
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
                              Informe quem deve ter acesso a este anexo
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-4">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                          Criar Anexo
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

export default AttachmentInformative;
