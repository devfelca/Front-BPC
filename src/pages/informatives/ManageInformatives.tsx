
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, File, ClipboardList, FileArchive, Paperclip, Search, Trash2, Edit, Eye } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

// Mock data for informativos
const mockInformativos = [
  {
    id: "1",
    title: "Comunicado importante sobre a reunião mensal",
    type: "text",
    createdAt: "2025-05-08",
    audience: "Todos",
    content: "Gostaríamos de informar que a próxima reunião mensal será realizada no dia 15 de junho às 19h no auditório principal. Pedimos a presença de todos os associados para discussão de temas importantes."
  },
  {
    id: "2",
    title: "Documentação para novos associados",
    type: "file",
    createdAt: "2025-05-07",
    audience: "Associados",
    fileUrl: "/documentos/manual-novos-associados.pdf"
  },
  {
    id: "3",
    title: "Formulário de inscrição para eventos",
    type: "form",
    createdAt: "2025-05-06",
    audience: "Voluntários",
    formFields: [
      { name: "name", label: "Nome", type: "text" },
      { name: "email", label: "Email", type: "email" }
    ]
  },
  {
    id: "4",
    title: "Nova parceria com empresa local",
    type: "news",
    createdAt: "2025-05-05",
    audience: "Todos",
    summary: "Nossa organização firmou uma importante parceria com a empresa XYZ para apoiar nossos projetos sociais.",
    content: "Temos o prazer de anunciar que firmamos parceria com a empresa XYZ, que apoiará nossos projetos sociais durante o próximo ano. Esta colaboração permitirá expandir nosso alcance e melhorar o impacto de nossas ações na comunidade."
  },
  {
    id: "5",
    title: "Requisição de materiais para evento",
    type: "request",
    createdAt: "2025-05-04",
    audience: "Coordenadores",
    items: [
      { name: "Cadeiras", quantity: 50 },
      { name: "Mesas", quantity: 10 },
      { name: "Projetor", quantity: 1 }
    ]
  },
  {
    id: "6",
    title: "Anexos da última assembleia",
    type: "attachment",
    createdAt: "2025-05-03",
    audience: "Líderes de Família",
    attachments: [
      { name: "Ata da reunião", url: "/anexos/ata-reuniao.pdf" },
      { name: "Lista de presença", url: "/anexos/lista-presenca.pdf" }
    ]
  },
];

interface Informativo {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  audience: string;
  content?: string;
  summary?: string;
  fileUrl?: string;
  formFields?: { name: string; label: string; type: string }[];
  items?: { name: string; quantity: number }[];
  attachments?: { name: string; url: string }[];
}

const ManageInformatives: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInformativo, setSelectedInformativo] = useState<Informativo | null>(null);
  const navigate = useNavigate();

  const filteredInformativos = mockInformativos.filter((info) => {
    const matchesSearch = info.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || info.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-5 w-5 text-indigo-600" />;
      case "file":
        return <File className="h-5 w-5 text-blue-600" />;
      case "form":
        return <ClipboardList className="h-5 w-5 text-green-600" />;
      case "news":
        return <FileText className="h-5 w-5 text-orange-600" />;
      case "request":
        return <FileArchive className="h-5 w-5 text-red-600" />;
      case "attachment":
        return <Paperclip className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleViewInformativo = (informativo: Informativo) => {
    setSelectedInformativo(informativo);
    setViewDialogOpen(true);
  };

  const handleEditInformativo = (informativo: Informativo) => {
    // Navigate to the appropriate edit page based on the type
    navigate(`/informatives/${informativo.type}`, { state: { informativo, editMode: true } });
  };

  const handleDeleteConfirmation = (informativo: Informativo) => {
    setSelectedInformativo(informativo);
    setDeleteDialogOpen(true);
  };

  const handleDeleteInformativo = () => {
    // In a real application, you would make an API call to delete the informativo
    // For now, we'll just show a toast and close the dialog
    toast({
      title: "Informativo excluído",
      description: `O informativo "${selectedInformativo?.title}" foi excluído com sucesso.`,
    });
    setDeleteDialogOpen(false);
  };

  const renderInformativoContent = () => {
    if (!selectedInformativo) return null;

    switch (selectedInformativo.type) {
      case "text":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="whitespace-pre-wrap">{selectedInformativo.content}</p>
          </div>
        );
      case "file":
        return (
          <div className="mt-4 flex items-center gap-2">
            <File className="h-5 w-5 text-blue-600" />
            <a 
              href={selectedInformativo.fileUrl} 
              className="text-blue-600 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Baixar arquivo
            </a>
          </div>
        );
      case "form":
        return (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Campos do formulário:</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              {selectedInformativo.formFields?.map((field, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{field.label}</p>
                  <p className="text-gray-500 text-sm">Tipo: {field.type}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "news":
        return (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Resumo:</h4>
            <p className="bg-gray-50 p-4 rounded-md mb-4">{selectedInformativo.summary}</p>
            <h4 className="font-semibold mb-2">Conteúdo completo:</h4>
            <p className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">{selectedInformativo.content}</p>
          </div>
        );
      case "request":
        return (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Itens solicitados:</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              {selectedInformativo.items?.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.quantity} un.</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "attachment":
        return (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Anexos:</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              {selectedInformativo.attachments?.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Paperclip className="h-4 w-4" />
                  <a 
                    href={attachment.url} 
                    className="text-blue-600 hover:underline"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {attachment.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <p className="text-muted-foreground">Sem conteúdo disponível.</p>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <main className="max-w-7xl mx-auto w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-indigo-600">Gerenciar Informativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar informativos..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2 self-end">
                        <Button variant="outline" asChild>
                          <a href="/informatives/text">Criar Novo</a>
                        </Button>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-3 sm:grid-cols-7 mb-4">
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        <TabsTrigger value="text">Texto</TabsTrigger>
                        <TabsTrigger value="file">Arquivo</TabsTrigger>
                        <TabsTrigger value="form">Formulário</TabsTrigger>
                        <TabsTrigger value="news">Notícia</TabsTrigger>
                        <TabsTrigger value="request">Requisição</TabsTrigger>
                        <TabsTrigger value="attachment">Anexo</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="mt-0">
                        <div className="rounded-md border">
                          <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                              <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Título</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Audiência</th>
                                  <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                                </tr>
                              </thead>
                              <tbody className="[&_tr:last-child]:border-0">
                                {filteredInformativos.length > 0 ? (
                                  filteredInformativos.map((info) => (
                                    <tr key={info.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                      <td className="p-4 align-middle">{getIconForType(info.type)}</td>
                                      <td className="p-4 align-middle font-medium">{info.title}</td>
                                      <td className="p-4 align-middle">{info.createdAt}</td>
                                      <td className="p-4 align-middle">{info.audience}</td>
                                      <td className="p-4 align-middle">
                                        <div className="flex justify-center gap-2">
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            title="Visualizar"
                                            onClick={() => handleViewInformativo(info)}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            title="Editar"
                                            onClick={() => handleEditInformativo(info)}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            title="Excluir"
                                            onClick={() => handleDeleteConfirmation(info)}
                                          >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                      Nenhum informativo encontrado.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="text" className="mt-0">
                        <div className="rounded-md border">
                          <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                              <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Título</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Audiência</th>
                                  <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                                </tr>
                              </thead>
                              <tbody className="[&_tr:last-child]:border-0">
                                {filteredInformativos
                                  .filter((info) => info.type === "text")
                                  .map((info) => (
                                    <tr
                                      key={info.id}
                                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                      <td className="p-4 align-middle">
                                        {getIconForType(info.type)}
                                      </td>
                                      <td className="p-4 align-middle font-medium">
                                        {info.title}
                                      </td>
                                      <td className="p-4 align-middle">{info.createdAt}</td>
                                      <td className="p-4 align-middle">{info.audience}</td>
                                      <td className="p-4 align-middle">
                                        <div className="flex justify-center gap-2">
                                          <Button variant="ghost" size="icon" title="Visualizar">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Editar">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Excluir">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                {filteredInformativos.filter((info) => info.type === "text").length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                      Nenhum informativo encontrado.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="file" className="mt-0">
                        <div className="rounded-md border">
                          <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                              <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Título</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Audiência</th>
                                  <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                                </tr>
                              </thead>
                              <tbody className="[&_tr:last-child]:border-0">
                                {filteredInformativos
                                  .filter((info) => info.type === "file")
                                  .map((info) => (
                                    <tr
                                      key={info.id}
                                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                      <td className="p-4 align-middle">
                                        {getIconForType(info.type)}
                                      </td>
                                      <td className="p-4 align-middle font-medium">
                                        {info.title}
                                      </td>
                                      <td className="p-4 align-middle">{info.createdAt}</td>
                                      <td className="p-4 align-middle">{info.audience}</td>
                                      <td className="p-4 align-middle">
                                        <div className="flex justify-center gap-2">
                                          <Button variant="ghost" size="icon" title="Visualizar">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Editar">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Excluir">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                {filteredInformativos.filter((info) => info.type === "file").length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                      Nenhum informativo encontrado.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="form" className="mt-0">
                        <div className="rounded-md border">
                          <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                              <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Título</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Audiência</th>
                                  <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                                </tr>
                              </thead>
                              <tbody className="[&_tr:last-child]:border-0">
                                {filteredInformativos
                                  .filter((info) => info.type === "form")
                                  .map((info) => (
                                    <tr
                                      key={info.id}
                                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                      <td className="p-4 align-middle">
                                        {getIconForType(info.type)}
                                      </td>
                                      <td className="p-4 align-middle font-medium">
                                        {info.title}
                                      </td>
                                      <td className="p-4 align-middle">{info.createdAt}</td>
                                      <td className="p-4 align-middle">{info.audience}</td>
                                      <td className="p-4 align-middle">
                                        <div className="flex justify-center gap-2">
                                          <Button variant="ghost" size="icon" title="Visualizar">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Editar">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Excluir">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                {filteredInformativos.filter((info) => info.type === "form").length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                      Nenhum informativo encontrado.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="news" className="mt-0">
                        <div className="rounded-md border">
                          <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                              <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Título</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Audiência</th>
                                  <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                                </tr>
                              </thead>
                              <tbody className="[&_tr:last-child]:border-0">
                                {filteredInformativos
                                  .filter((info) => info.type === "news")
                                  .map((info) => (
                                    <tr
                                      key={info.id}
                                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                      <td className="p-4 align-middle">
                                        {getIconForType(info.type)}
                                      </td>
                                      <td className="p-4 align-middle font-medium">
                                        {info.title}
                                      </td>
                                      <td className="p-4 align-middle">{info.createdAt}</td>
                                      <td className="p-4 align-middle">{info.audience}</td>
                                      <td className="p-4 align-middle">
                                        <div className="flex justify-center gap-2">
                                          <Button variant="ghost" size="icon" title="Visualizar">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Editar">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Excluir">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                {filteredInformativos.filter((info) => info.type === "news").length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                      Nenhum informativo encontrado.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="request" className="mt-0">
                        <div className="rounded-md border">
                          <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                              <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Título</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Audiência</th>
                                  <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                                </tr>
                              </thead>
                              <tbody className="[&_tr:last-child]:border-0">
                                {filteredInformativos
                                  .filter((info) => info.type === "request")
                                  .map((info) => (
                                    <tr
                                      key={info.id}
                                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                      <td className="p-4 align-middle">
                                        {getIconForType(info.type)}
                                      </td>
                                      <td className="p-4 align-middle font-medium">
                                        {info.title}
                                      </td>
                                      <td className="p-4 align-middle">{info.createdAt}</td>
                                      <td className="p-4 align-middle">{info.audience}</td>
                                      <td className="p-4 align-middle">
                                        <div className="flex justify-center gap-2">
                                          <Button variant="ghost" size="icon" title="Visualizar">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Editar">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Excluir">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                {filteredInformativos.filter((info) => info.type === "request").length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                      Nenhum informativo encontrado.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="attachment" className="mt-0">
                        <div className="rounded-md border">
                          <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                              <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Título</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                                  <th className="h-12 px-4 text-left align-middle font-medium">Audiência</th>
                                  <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                                </tr>
                              </thead>
                              <tbody className="[&_tr:last-child]:border-0">
                                {filteredInformativos
                                  .filter((info) => info.type === "attachment")
                                  .map((info) => (
                                    <tr
                                      key={info.id}
                                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                      <td className="p-4 align-middle">
                                        {getIconForType(info.type)}
                                      </td>
                                      <td className="p-4 align-middle font-medium">
                                        {info.title}
                                      </td>
                                      <td className="p-4 align-middle">{info.createdAt}</td>
                                      <td className="p-4 align-middle">{info.audience}</td>
                                      <td className="p-4 align-middle">
                                        <div className="flex justify-center gap-2">
                                          <Button variant="ghost" size="icon" title="Visualizar">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Editar">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" title="Excluir">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                {filteredInformativos.filter((info) => info.type === "attachment").length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                      Nenhum informativo encontrado.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* View Dialog */}
              <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {selectedInformativo && getIconForType(selectedInformativo.type)}
                      <span>{selectedInformativo?.title}</span>
                    </DialogTitle>
                    <DialogDescription>
                      {selectedInformativo && (
                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-2 text-sm">
                          <span className="text-gray-600">Criado em: {selectedInformativo.createdAt}</span>
                          <span className="text-gray-600">Público: {selectedInformativo.audience}</span>
                        </div>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  {renderInformativoContent()}
                  <DialogFooter className="sm:justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => setViewDialogOpen(false)}
                    >
                      Fechar
                    </Button>
                    {selectedInformativo && (
                      <Button 
                        variant="default" 
                        onClick={() => {
                          setViewDialogOpen(false);
                          handleEditInformativo(selectedInformativo);
                        }}
                      >
                        Editar
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Confirmation Dialog */}
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Excluir Informativo</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja excluir "{selectedInformativo?.title}"? Esta ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => setDeleteDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteInformativo}
                    >
                      Excluir
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default ManageInformatives;
