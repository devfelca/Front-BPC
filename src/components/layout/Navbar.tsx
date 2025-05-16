
import NavbarLogo from "./NavbarLogo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import InformativesDropdown from "./InformativesDropdown";
import AccountDropdown from "./AccountDropdown";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você implementaria a lógica de logout real
    navigate("/");
    console.log("Usuário fez logout");
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <SidebarTrigger className="mr-2" />
            <NavbarLogo />
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <InformativesDropdown />
            <AccountDropdown />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
