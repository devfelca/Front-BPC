
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Donation, DonorType, initialDonations } from "./types";
import DonationsSummary from "./DonationsSummary";
import DonationsFilter from "./DonationsFilter";
import DonationForm from "./DonationForm";
import DonationsTable from "./DonationsTable";

// Create a context for the donations data
export const useDonationsData = () => {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  return { donations, setDonations };
};

const DonationsManagement = () => {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [newDonation, setNewDonation] = useState<Partial<Donation>>({
    donorName: "",
    donorType: "associado" as DonorType,
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  
  const { toast } = useToast();

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = 
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (typeFilter === "all") return matchesSearch;
    return matchesSearch && donation.donorType === typeFilter;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDonation(prev => ({ ...prev, [name]: name === "amount" ? parseFloat(value) : value }));
  };

  const handleSelectChange = (value: string) => {
    setNewDonation(prev => ({ ...prev, donorType: value as DonorType }));
  };

  const handleAddDonation = () => {
    // Validate inputs
    if (!newDonation.donorName || !newDonation.amount || !newDonation.date) {
      toast({
        title: "Erro ao adicionar doação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const donation: Donation = {
      id: `${donations.length + 1}`,
      donorName: newDonation.donorName || "",
      donorType: newDonation.donorType as DonorType || "associado",
      amount: newDonation.amount || 0,
      date: newDonation.date || new Date().toISOString().split("T")[0],
      description: newDonation.description || "",
    };

    setDonations([...donations, donation]);
    
    // Reset form
    setNewDonation({
      donorName: "",
      donorType: "associado" as DonorType,
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      description: "",
    });

    toast({
      title: "Doação registrada com sucesso",
      description: `Doação de R$ ${donation.amount.toFixed(2)} de ${donation.donorName} registrada.`,
    });
  };

  return (
    <div className="space-y-6">
      <DonationsSummary donations={donations} />

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <DonationsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Doação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Registrar Nova Doação</DialogTitle>
            </DialogHeader>
            <DonationForm
              newDonation={newDonation}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleAddDonation={handleAddDonation}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DonationsTable donations={filteredDonations} />
    </div>
  );
};

export default DonationsManagement;
