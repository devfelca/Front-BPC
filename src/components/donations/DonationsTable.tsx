
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Donation } from "./types";
import { formatCurrency, formatDate, getDonorTypeName } from "./utils";

interface DonationsTableProps {
  donations: Donation[];
}

const DonationsTable = ({ donations }: DonationsTableProps) => {
  return (
    <Table>
      <TableCaption>Lista de doações registradas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Doador</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.length > 0 ? (
          donations.map((donation) => (
            <TableRow key={donation.id}>
              <TableCell className="font-medium">{donation.donorName}</TableCell>
              <TableCell>{getDonorTypeName(donation.donorType)}</TableCell>
              <TableCell>{formatCurrency(donation.amount)}</TableCell>
              <TableCell>{formatDate(donation.date)}</TableCell>
              <TableCell>{donation.description}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              Nenhuma doação encontrada com os filtros aplicados.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DonationsTable;
