
import { Link } from "react-router-dom";
import { 
  Users, 
  FileText, 
  FolderUp, 
  CheckSquare, 
  FileCheck,
  Info,
  Settings
} from "lucide-react";
import { 
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar";
import NavbarLogo from "./NavbarLogo";
import InformativesDropdown from "./InformativesDropdown";
import AccountDropdown from "./AccountDropdown";

const Sidebar = () => {
  return (
    <SidebarUI>
      <SidebarHeader>
        <div className="px-4 py-2">
          <NavbarLogo />
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Início">
              <Link to="/" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Início</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Informativos">
              <Link to="#" className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                <span>Informativos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Gerenciar Contas">
              <Link to="#" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Gerenciar Contas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Associados">
              <Link to="/associates" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Associados</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Famílias">
              <Link to="/family-management" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Famílias</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Documentos">
              <Link to="/document-upload" className="flex items-center">
                <FolderUp className="mr-2 h-4 w-4" />
                <span>Documentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Aprovação de Documentos">
              <Link to="/document-approval" className="flex items-center">
                <CheckSquare className="mr-2 h-4 w-4" />
                <span>Aprovação de Documentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Documentos de Associados">
              <Link to="/associate-documents" className="flex items-center">
                <FileCheck className="mr-2 h-4 w-4" />
                <span>Documentos de Associados</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </SidebarUI>
  );
};

export default Sidebar;
