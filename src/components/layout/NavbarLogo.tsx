
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex-shrink-0 flex items-center">
      <img 
        src="/lovable-uploads/5bc7ddf5-ec00-4d0d-aff0-91d93ff19171.png" 
        alt="Observatório BPC Logo" 
        className="h-10 w-auto mr-2" 
      />
      <span className="text-xl font-bold text-indigo-600">Observatório BPC</span>
    </Link>
  );
};

export default NavbarLogo;
