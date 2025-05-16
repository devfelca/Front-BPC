
import { Link } from "react-router-dom";
import { Settings, User, Shield, Key, Mail, Users, Search, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
          <Settings className="mr-2 h-4 w-4" />
          Gerenciar Contas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Gerenciamento de Contas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Perfil e Credenciais */}
        <Link to="/account/profile">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil do Usuário</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/account/profile/edit">
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>Editar Perfil</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/account/reset-password">
          <DropdownMenuItem>
            <Key className="mr-2 h-4 w-4" />
            <span>Resetar Senha</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/account/change-email">
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>Alterar Email</span>
          </DropdownMenuItem>
        </Link>
        
        <DropdownMenuSeparator />
        
        {/* Busca e Gerenciamento */}
        <Link to="/account/search">
          <DropdownMenuItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Buscar Associados</span>
          </DropdownMenuItem>
        </Link>
        
        {/* Níveis de Acesso */}
        <DropdownMenuLabel>Níveis de Acesso</DropdownMenuLabel>
        <Link to="/account/admins">
          <DropdownMenuItem>
            <Shield className="mr-2 h-4 w-4" />
            <span>Gerenciar Administradores</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/account/volunteers">
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Gerenciar Voluntários</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/account/managed-associates">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Gerenciar Associados</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/account/family-leaders">
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Líderes de Família</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/account/coordinators">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Coordenadores</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
