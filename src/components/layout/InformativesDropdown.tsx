
import { Link } from "react-router-dom";
import { Info, FileText, File, ClipboardList, FileArchive, Paperclip, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const InformativesDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
          <Info className="mr-2 h-4 w-4" />
          Informativos
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Adicionar Informativo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <Link to="/informatives/text">
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Texto</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/informatives/file">
          <DropdownMenuItem>
            <File className="mr-2 h-4 w-4" />
            <span>Arquivo</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/informatives/form">
          <DropdownMenuItem>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>Formulário</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/informatives/news">
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Notícia</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/informatives/request">
          <DropdownMenuItem>
            <FileArchive className="mr-2 h-4 w-4" />
            <span>Requisição</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/informatives/attachment">
          <DropdownMenuItem>
            <Paperclip className="mr-2 h-4 w-4" />
            <span>Anexo</span>
          </DropdownMenuItem>
        </Link>
        
        <DropdownMenuSeparator />
        <Link to="/informatives/manage">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Gerenciar Informativos</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InformativesDropdown;
