
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { File, Download, Trash, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FileUploader from "@/components/documents/FileUploader";
import { useToast } from "@/components/ui/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";

// Mock data - in a real app, this would come from an API
const initialAssociates = [
  {
    id: "1",
    name: "Ana Maria Silva",
    documentId: "123.456.789-00",
  },
  {
    id: "2",
    name: "João Carlos Oliveira",
    documentId: "987.654.321-00",
  },
  {
    id: "3",
    name: "Márcia Rodrigues",
    documentId: "456.789.123-00",
  },
];

const initialDocuments = [
  {
    id: "d1",
    associateId: "1",
    fileName: "comprovante_bpc_2023.pdf",
    fileType: "application/pdf",
    fileSize: "1.2 MB",
    documentType: "bpc",
    uploadDate: "2023-05-10",
  },
  {
    id: "d2",
    associateId: "1",
    fileName: "documento_identidade.jpg",
    fileType: "image/jpeg",
    fileSize: "0.8 MB",
    documentType: "id",
    uploadDate: "2023-04-15",
  },
  {
    id: "d3",
    associateId: "2",
    fileName: "laudo_medico.pdf",
    fileType: "application/pdf",
    fileSize: "2.4 MB",
    documentType: "medical",
    uploadDate: "2023-06-22",
  },
];

const documentTypeLabels: Record<string, string> = {
  id: "Documento de Identidade",
  bpc: "Comprovante BPC",
  medical: "Laudo Médico",
  income: "Comprovante de Renda",
  address: "Comprovante de Endereço",
  other: "Outro",
};

const DocumentUpload = () => {
  const [associates] = useState(initialAssociates);
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedAssociateId, setSelectedAssociateId] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");
  const [documentDescription, setDocumentDescription] = useState<string>("");
  
  const { toast } = useToast();

  const associateDocuments = selectedAssociateId
    ? documents.filter(doc => doc.associateId === selectedAssociateId)
    : [];

  const handleFileUpload = (file: File) => {
    if (!selectedAssociateId || !documentType) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um associado e o tipo de documento.",
        variant: "destructive",
      });
      return;
    }

    const newDocument = {
      id: `d${documents.length + 1}`,
      associateId: selectedAssociateId,
      fileName: file.name,
      fileType: file.type,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      documentType,
      description: documentDescription,
      uploadDate: new Date().toISOString().split("T")[0],
    };

    setDocuments([...documents, newDocument]);
    setDocumentDescription("");
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
    toast({
      title: "Documento excluído",
      description: "O documento foi removido com sucesso.",
    });
  };

  const handleDownloadDocument = (document: any) => {
    // In a real app, this would download the actual file
    toast({
      title: "Download iniciado",
      description: `Baixando ${document.fileName}...`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <main>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload de Documentos</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Enviar Novo Documento</CardTitle>
                      <CardDescription>
                        Envie documentos para associados como comprovantes de BPC, documentos de identidade e outros.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="associate">Associado *</Label>
                        <Select value={selectedAssociateId} onValueChange={setSelectedAssociateId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um associado" />
                          </SelectTrigger>
                          <SelectContent>
                            {associates.map((associate) => (
                              <SelectItem key={associate.id} value={associate.id}>
                                {associate.name} - CPF: {associate.documentId}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="documentType">Tipo de Documento *</Label>
                        <Select value={documentType} onValueChange={setDocumentType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de documento" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(documentTypeLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                          id="description"
                          value={documentDescription}
                          onChange={(e) => setDocumentDescription(e.target.value)}
                          placeholder="Descrição adicional do documento"
                        />
                      </div>

                      <FileUploader onFileUpload={handleFileUpload} />
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Documentos Recentes</CardTitle>
                      <CardDescription>
                        {selectedAssociateId 
                          ? `Documentos do associado selecionado.` 
                          : "Selecione um associado para ver seus documentos."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedAssociateId ? (
                        associateDocuments.length > 0 ? (
                          <div className="space-y-4">
                            {associateDocuments.map((doc) => (
                              <div 
                                key={doc.id} 
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="bg-indigo-100 p-2 rounded-md">
                                    {doc.fileType.includes("pdf") ? (
                                      <FileText className="h-6 w-6 text-indigo-600" />
                                    ) : (
                                      <File className="h-6 w-6 text-indigo-600" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium line-clamp-1">{doc.fileName}</p>
                                    <p className="text-sm text-gray-500">
                                      {documentTypeLabels[doc.documentType]} · {doc.fileSize}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex space-x-1">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleDownloadDocument(doc)}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleDeleteDocument(doc.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">Nenhum documento encontrado.</p>
                          </div>
                        )
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Selecione um associado para ver os documentos.</p>
                        </div>
                      )}
                    </CardContent>
                    {selectedAssociateId && associateDocuments.length > 0 && (
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Ver todos os documentos
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default DocumentUpload;
