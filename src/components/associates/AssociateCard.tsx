
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

interface AssociateCardProps {
  id: string;
  name: string;
  documentId: string;
  phone: string;
  hasBPC: boolean;
  familySize: number;
  onEdit: (id: string) => void;
  onViewFamily: (id: string) => void;
}

const AssociateCard = ({
  id,
  name,
  documentId,
  phone,
  hasBPC,
  familySize,
  onEdit,
  onViewFamily,
}: AssociateCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          {hasBPC && (
            <Badge className="bg-green-600">
              <UserCheck className="h-3 w-3 mr-1" />
              BPC
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="text-sm font-medium text-gray-500">CPF:</span>
          <span className="ml-2">{documentId}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Telefone:</span>
          <span className="ml-2">{phone}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Membros na família:</span>
          <span className="ml-2">{familySize}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
          Editar
        </Button>
        <Button size="sm" onClick={() => onViewFamily(id)}>
          Ver família
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssociateCard;
