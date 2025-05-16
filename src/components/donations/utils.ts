
import { DonorType, Donation } from "./types";

// Format the currency to BRL
export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Format the date to Brazilian format
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const getTotalByType = (donations: Donation[], type: string) => {
  if (type === "all") {
    return donations.reduce((acc, donation) => acc + donation.amount, 0);
  }
  return donations
    .filter(donation => donation.donorType === type)
    .reduce((acc, donation) => acc + donation.amount, 0);
};

export const getDonorTypeName = (type: DonorType): string => {
  switch (type) {
    case "associado": return "Associado";
    case "voluntario": return "Voluntário";
    case "coordenador": return "Coordenador";
    case "externo": return "Externo";
    default: return type;
  }
};
