
import { HandCoins } from "lucide-react";
import { Donation } from "./types";
import { formatCurrency, getTotalByType } from "./utils";

interface DonationsSummaryProps {
  donations: Donation[];
}

const DonationsSummary = ({ donations }: DonationsSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <HandCoins className="mr-2 h-5 w-5 text-indigo-500" />
        Resumo de Doações
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 p-4 rounded-md">
          <p className="text-sm text-gray-500">Total de Doações</p>
          <p className="text-xl font-bold">{formatCurrency(getTotalByType(donations, "all"))}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-sm text-gray-500">Associados</p>
          <p className="text-xl font-bold">{formatCurrency(getTotalByType(donations, "associado"))}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-gray-500">Voluntários</p>
          <p className="text-xl font-bold">{formatCurrency(getTotalByType(donations, "voluntario"))}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-md">
          <p className="text-sm text-gray-500">Externos</p>
          <p className="text-xl font-bold">{formatCurrency(getTotalByType(donations, "externo"))}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationsSummary;
