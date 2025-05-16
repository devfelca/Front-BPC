
import { Calendar, Coins } from "lucide-react";
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
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DonorType, Donation } from "./types";

interface DonationFormProps {
  newDonation: Partial<Donation>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string) => void;
  handleAddDonation: () => void;
}

const DonationForm = ({
  newDonation,
  handleInputChange,
  handleSelectChange,
  handleAddDonation,
}: DonationFormProps) => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="donorName" className="text-right">
            Nome do Doador
          </Label>
          <Input
            id="donorName"
            name="donorName"
            value={newDonation.donorName || ""}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="Nome completo do doador"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="donorType" className="text-right">
            Tipo de Doador
          </Label>
          <Select
            value={newDonation.donorType || "associado"}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecione o tipo de doador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="associado">Associado</SelectItem>
              <SelectItem value="voluntario">Voluntário</SelectItem>
              <SelectItem value="coordenador">Coordenador</SelectItem>
              <SelectItem value="externo">Externo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="amount" className="text-right">
            Valor (R$)
          </Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            value={newDonation.amount || ""}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="0.00"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">
            Data
          </Label>
          <div className="col-span-3 relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              id="date"
              name="date"
              type="date"
              value={newDonation.date || ""}
              onChange={handleInputChange}
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Descrição
          </Label>
          <Input
            id="description"
            name="description"
            value={newDonation.description || ""}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="Descrição ou finalidade da doação"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button onClick={handleAddDonation}>
          <Coins className="mr-2 h-4 w-4" />
          Registrar Doação
        </Button>
      </DialogFooter>
    </>
  );
};

export default DonationForm;
