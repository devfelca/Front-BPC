import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, ArrowUp, Check, X, File, Loader, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import FileUploader from "@/components/documents/FileUploader";

// Tipos de status para os documentos
type DocumentStatus = "pending" | "reviewing" | "approved" | "rejected";

// Interface para os documentos
interface RequiredDocument {
  id: string;
  type: string;
  description: string;
  required: boolean;
  status: DocumentStatus;
  uploadDate?: string;
  fileName?: string;
  rejectionReason?: string;
}

const AssociateDocuments: React.FC = () => {
  const { toast } = useToast();
  
  // Estado para os documentos obrigatórios
  const [requiredDocuments, setRequiredDocuments] = useState<RequiredDocument[]>([
    {
      id: "1",
      type: "RG (frente e verso)",
      description: "Documento de identidade com foto",
      required: true,
      status: "pending"
    },
    {
      id: "2",
      type: "CPF",
      description: "Cadastro de pessoa física",
      required: true,
      status: "reviewing",
      uploadDate: "10/05/2023",
      fileName: "cpf.pdf"
    },
    {
      id: "3",
      type: "Comprovante de Residência",
      description: "Conta de luz, água ou telefone recente",
      required: true,
      status: "approved",
      uploadDate: "05/04/2023",
      fileName: "comprovante_residencia.pdf"
    },
    {
      id: "4",
      type: "Comprovante de Renda",
      description: "Holerite, declaração de imposto de renda ou extrato bancário",
      required: true,
      status: "rejected",
      uploadDate: "01/05/2023",
      fileName: "comprovante_renda.pdf",
      rejectionReason: "Documento ilegível, por favor reenvie."
    },
    {
      id: "5",
      type: "Cartão do BPC",
      description: "Cartão do Benefício de Prestação Continuada",
      required: false,
      status: "pending"
    }
  ]);

  // Função para renderizar o badge do status
  const renderStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-yellow-600 border-yellow-600">
            <Clock className="h-3 w-3" /> Pendente
          </Badge>
        );
      case "reviewing":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-blue-600 border-blue-600">
            <Loader className="h-3 w-3 animate-spin" /> Em análise
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-600">
            <Check className="h-3 w-3" /> Aprovado
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-red-600 border-red-600">
            <X className="h-3 w-3" /> Rejeitado
          </Badge>
        );
    }
  };

  // Função para enviar um documento
  const uploadDocument = (documentId: string, files: File[]) => {
    if (files.length > 0) {
      setRequiredDocuments(
        requiredDocuments.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "pending",
                fileName: files[0].name,
                uploadDate: new Date().toLocaleDateString('pt-BR'),
              }
            : doc
        )
      );
      
      toast({
        title: "Documento enviado",
        description: "Seu documento foi enviado e está aguardando revisão.",
      });
    }
  };

  // Função para reenviar um documento
  const reuploadDocument = (documentId: string, files: File[]) => {
    if (files.length > 0) {
      setRequiredDocuments(
        requiredDocuments.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "pending",
                fileName: files[0].name,
                uploadDate: new Date().toLocaleDateString('pt-BR'),
                rejectionReason: undefined,
              }
            : doc
        )
      );
      
      toast({
        title: "Documento reenviado",
        description: "Seu documento foi reenviado e está aguardando nova revisão.",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6">Meus Documentos</h1>
            
            <p className="mb-6 text-gray-600">
              Por favor, envie os documentos solicitados para completar seu cadastro. 
              Documentos marcados com <span className="text-red-500">*</span> são obrigatórios.
            </p>
            
            <div className="space-y-6">
              {requiredDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <File className="h-5 w-5 text-indigo-600" />
                        <CardTitle className="text-lg">
                          {doc.type} {doc.required && <span className="text-red-500">*</span>}
                        </CardTitle>
                      </div>
                      {doc.status !== "pending" || doc.fileName ? renderStatusBadge(doc.status) : null}
                    </div>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {doc.fileName && (
                      <div className="bg-gray-50 p-3 mb-4 rounded-md flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-gray-500" />
                          <span>{doc.fileName}</span>
                        </div>
                        <span className="text-sm text-gray-500">Enviado em: {doc.uploadDate}</span>
                      </div>
                    )}
                    
                    {doc.status === "rejected" && doc.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 p-3 mb-4 rounded-md text-red-600 text-sm">
                        <p><strong>Motivo da rejeição:</strong> {doc.rejectionReason}</p>
                      </div>
                    )}
                    
                    {doc.status === "approved" ? (
                      <Button disabled variant="outline" className="w-full">
                        <Check className="h-4 w-4 mr-2 text-green-600" /> Aprovado
                      </Button>
                    ) : doc.status === "reviewing" ? (
                      <div className="text-center p-3 text-blue-600">
                        <Loader className="h-5 w-5 animate-spin mx-auto mb-2" />
                        <p className="text-sm">Documento em análise</p>
                      </div>
                    ) : doc.status === "rejected" ? (
                      <FileUploader 
                        onFilesSelected={(files) => reuploadDocument(doc.id, files)}
                      />
                    ) : (
                      <FileUploader 
                        onFilesSelected={(files) => uploadDocument(doc.id, files)}
                      />
                    )}
                  </CardContent>
                  
                  {doc.status === "rejected" && (
                    <CardFooter>
                      <Button className="w-full flex items-center justify-center">
                        <ArrowUp className="h-4 w-4 mr-2" /> Reenviar
                      </Button>
                    </CardFooter>
                  )}
                  
                  {!doc.fileName && doc.status === "pending" && (
                    <CardFooter>
                      <Button className="w-full flex items-center justify-center">
                        <Upload className="h-4 w-4 mr-2" /> Enviar
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AssociateDocuments;
