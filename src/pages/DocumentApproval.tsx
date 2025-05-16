import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, ArrowUp, Check, X, File, Loader, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

// Tipos de status para os documentos
type DocumentStatus = "pending" | "reviewing" | "approved" | "rejected";

// Interface para os documentos
interface Document {
  id: string;
  associateId: string;
  associateName: string;
  documentType: string;
  fileName: string;
  uploadDate: string;
  status: DocumentStatus;
  rejectionReason?: string;
}

const DocumentApproval: React.FC = () => {
  const { toast } = useToast();
  const [documentToReject, setDocumentToReject] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  // Estado para os documentos - dados mockados para exemplo
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      associateId: "1001",
      associateName: "Ana Silva",
      documentType: "RG (frente e verso)",
      fileName: "rg_ana_silva.pdf",
      uploadDate: "10/05/2023",
      status: "pending"
    },
    {
      id: "2",
      associateId: "1002",
      associateName: "Carlos Oliveira",
      documentType: "CPF",
      fileName: "cpf_carlos.pdf",
      uploadDate: "10/05/2023",
      status: "reviewing"
    },
    {
      id: "3",
      associateId: "1003",
      associateName: "Maria Santos",
      documentType: "Comprovante de Residência",
      fileName: "residencia_maria.pdf",
      uploadDate: "05/04/2023",
      status: "approved"
    },
    {
      id: "4",
      associateId: "1004",
      associateName: "João Pereira",
      documentType: "Comprovante de Renda",
      fileName: "renda_joao.pdf",
      uploadDate: "01/05/2023",
      status: "rejected",
      rejectionReason: "Documento ilegível, por favor reenvie."
    },
    {
      id: "5",
      associateId: "1001",
      associateName: "Ana Silva",
      documentType: "Cartão do BPC",
      fileName: "bpc_ana.pdf",
      uploadDate: "12/05/2023",
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

  // Função para aprovar um documento
  const approveDocument = (id: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, status: "approved" } : doc
      )
    );
    toast({
      title: "Documento aprovado",
      description: "O documento foi aprovado com sucesso.",
    });
  };

  // Função para rejeitar um documento
  const handleRejectSubmit = () => {
    if (!documentToReject) return;
    
    setDocuments(
      documents.map((doc) =>
        doc.id === documentToReject ? { ...doc, status: "rejected", rejectionReason } : doc
      )
    );
    
    toast({
      title: "Documento rejeitado",
      description: "O documento foi rejeitado e o associado será notificado.",
      variant: "destructive",
    });
    
    setDocumentToReject(null);
    setRejectionReason("");
  };

  // Função para iniciar a revisão de um documento
  const startReviewing = (id: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, status: "reviewing" } : doc
      )
    );
    toast({
      title: "Revisão iniciada",
      description: "Você começou a revisar este documento.",
    });
  };
  
  // Função para visualizar detalhes do documento
  const viewDocumentDetails = (document: Document) => {
    setSelectedDocument(document);
  };
  
  // Função para requisitar reenvio de um documento
  const requestReupload = (id: string) => {
    toast({
      title: "Reenvio solicitado",
      description: "O associado foi notificado para reenviar o documento.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Painel de Aprovação de Documentos</h1>
              <Badge className="bg-indigo-600 text-white">Painel do Administrador</Badge>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Documentos Enviados pelos Associados</CardTitle>
                <CardDescription>
                  Revise e aprove os documentos enviados pelos associados. Como administrador, você pode aprovar, rejeitar e solicitar reenvio dos documentos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Associado</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Data de Envio</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.associateName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <File className="h-4 w-4 text-indigo-600" />
                              {doc.documentType}
                              <span className="text-xs text-gray-500">({doc.fileName})</span>
                            </div>
                          </TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>{renderStatusBadge(doc.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => viewDocumentDetails(doc)}
                              >
                                <Eye className="h-4 w-4 mr-1" /> Ver
                              </Button>
                              
                              {doc.status === "pending" && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => startReviewing(doc.id)}
                                >
                                  Revisar
                                </Button>
                              )}
                              
                              {(doc.status === "reviewing" || doc.status === "pending") && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                    onClick={() => approveDocument(doc.id)}
                                  >
                                    <Check className="h-4 w-4 mr-1" /> Aprovar
                                  </Button>
                                  
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                    onClick={() => setDocumentToReject(doc.id)}
                                  >
                                    <X className="h-4 w-4 mr-1" /> Rejeitar
                                  </Button>
                                </>
                              )}
                              
                              {doc.status === "rejected" && (
                                <Button 
                                  size="sm" 
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => requestReupload(doc.id)}
                                >
                                  <Upload className="h-4 w-4 mr-1" /> Solicitar reenvio
                                </Button>
                              )}
                            </div>
                            
                            {doc.status === "rejected" && doc.rejectionReason && (
                              <p className="text-xs text-red-500 mt-1 text-right">
                                Motivo: {doc.rejectionReason}
                              </p>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
        
        {/* Diálogo de rejeição de documento */}
        <Dialog open={documentToReject !== null} onOpenChange={() => setDocumentToReject(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rejeitar Documento</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-4">Por favor, informe o motivo da rejeição:</p>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Descreva o motivo da rejeição do documento..."
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDocumentToReject(null)}>Cancelar</Button>
              <Button 
                variant="destructive" 
                onClick={handleRejectSubmit}
                disabled={!rejectionReason.trim()}
              >
                Rejeitar Documento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Diálogo de visualização de documento */}
        <Dialog open={selectedDocument !== null} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do Documento</DialogTitle>
            </DialogHeader>
            {selectedDocument && (
              <div className="py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Associado:</p>
                    <p>{selectedDocument.associateName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">ID do Associado:</p>
                    <p>{selectedDocument.associateId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Documento:</p>
                    <p>{selectedDocument.documentType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Arquivo:</p>
                    <p>{selectedDocument.fileName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Data de Envio:</p>
                    <p>{selectedDocument.uploadDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Status:</p>
                    <div>{renderStatusBadge(selectedDocument.status)}</div>
                  </div>
                </div>
                
                {selectedDocument.status === "rejected" && selectedDocument.rejectionReason && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-500">Motivo da Rejeição:</p>
                    <p className="text-red-600">{selectedDocument.rejectionReason}</p>
                  </div>
                )}
                
                <div className="mt-6 p-4 border rounded-md text-center bg-gray-50">
                  <p>Visualização do documento não disponível nesta versão de demonstração.</p>
                  <p className="text-sm text-gray-500 mt-2">Em um ambiente de produção, o documento seria exibido aqui.</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setSelectedDocument(null)}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
};

export default DocumentApproval;
