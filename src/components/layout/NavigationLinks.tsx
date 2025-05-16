
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, FileText, FolderUp, CheckSquare, FileCheck } from "lucide-react";
import InformativesDropdown from "./InformativesDropdown";
import AccountDropdown from "./AccountDropdown";

const NavigationLinks = () => {
  return (
    <div className="hidden">
      <div className="ml-10 flex items-baseline space-x-4">
        <Link to="/">
          <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
            Início
          </Button>
        </Link>
        
        <InformativesDropdown />
        <AccountDropdown />
        
        <Link to="/associates">
          <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
            <Users className="mr-2 h-4 w-4" />
            Associados
          </Button>
        </Link>
        <Link to="/family-management">
          <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
            <FileText className="mr-2 h-4 w-4" />
            Famílias
          </Button>
        </Link>
        <Link to="/document-upload">
          <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
            <FolderUp className="mr-2 h-4 w-4" />
            Documentos
          </Button>
        </Link>
        <Link to="/document-approval">
          <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
            <CheckSquare className="mr-2 h-4 w-4" />
            Aprovação de Documentos
          </Button>
        </Link>
        <Link to="/associate-documents">
          <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
            <FileCheck className="mr-2 h-4 w-4" />
            Documentos de Associados
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationLinks;
