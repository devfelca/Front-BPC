
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DonationsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
}

const DonationsFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  typeFilter, 
  setTypeFilter 
}: DonationsFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 flex-grow">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar por nome ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="w-full md:w-64">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="associado">Associados</SelectItem>
            <SelectItem value="voluntario">Voluntários</SelectItem>
            <SelectItem value="coordenador">Coordenadores</SelectItem>
            <SelectItem value="externo">Externos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DonationsFilter;
