
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Users, FileText, FolderUp, CheckSquare, FileCheck, Info, Settings } from "lucide-react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] sm:w-[300px]">
          <div className="flex flex-col gap-4 py-4">
            <Link to="/" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
              <FileText className="mr-3 h-5 w-5" />
              Início
            </Link>
            
            <Link to="/informatives/manage" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
              <Info className="mr-3 h-5 w-5" />
              Informativos
            </Link>
            
            <Link to="/account/profile" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
              <Settings className="mr-3 h-5 w-5" />
              Gerenciar Contas
            </Link>
            
            <Link to="/associates" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
              <Users className="mr-3 h-5 w-5" />
              Associados
            </Link>
            
            <Link to="/family-management" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
              <FileText className="mr-3 h-5 w-5" />
              Famílias
            </Link>
            
            <Link to="/document-upload" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
              <FolderUp className="mr-3 h-5 w-5" />
              Documentos
            </Link>
            
            <Link to="/document-approval" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
              <CheckSquare className="mr-3 h-5 w-5" />
              Aprovação de Documentos
            </Link>
            
            <Link to="/associate-documents" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
              <FileCheck className="mr-3 h-5 w-5" />
              Documentos de Associados
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
