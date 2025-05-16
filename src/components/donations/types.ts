
// Define the donor type enum
export type DonorType = "associado" | "voluntario" | "coordenador" | "externo";

export interface Donation {
  id: string;
  donorName: string;
  donorType: DonorType;
  amount: number;
  date: string;
  description: string;
}

// Mock data with proper type annotations
export const initialDonations: Donation[] = [
  {
    id: "1",
    donorName: "Ana Maria Silva",
    donorType: "associado",
    amount: 150.00,
    date: "2025-04-15",
    description: "Contribuição mensal",
  },
  {
    id: "2",
    donorName: "Carlos Eduardo Santos",
    donorType: "voluntario",
    amount: 75.50,
    date: "2025-04-10",
    description: "Doação voluntária",
  },
  {
    id: "3",
    donorName: "Empresa XYZ Ltda",
    donorType: "externo",
    amount: 1000.00,
    date: "2025-04-05",
    description: "Patrocínio para evento",
  },
  {
    id: "4",
    donorName: "Patrícia Oliveira",
    donorType: "coordenador",
    amount: 250.00,
    date: "2025-04-03",
    description: "Doação para compra de materiais",
  },
];
