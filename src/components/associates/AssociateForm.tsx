
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AssociateFormProps {
  existingData?: {
    id?: string;
    name: string;
    documentId: string;
    phone: string;
    address: string;
    hasBPC: boolean;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AssociateForm = ({ existingData, onSubmit, onCancel }: AssociateFormProps) => {
  const [formData, setFormData] = useState({
    name: existingData?.name || "",
    documentId: existingData?.documentId || "",
    phone: existingData?.phone || "",
    address: existingData?.address || "",
    hasBPC: existingData?.hasBPC || false,
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, hasBPC: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.documentId || !formData.phone) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...formData,
      id: existingData?.id || Date.now().toString(),
    });

    toast({
      title: existingData ? "Associado atualizado" : "Associado cadastrado",
      description: existingData 
        ? "Os dados do associado foram atualizados com sucesso."
        : "Novo associado foi cadastrado com sucesso.",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {existingData ? "Editar Associado" : "Cadastrar Novo Associado"}
        </CardTitle>
        <CardDescription>
          {existingData
            ? "Atualize as informações do associado abaixo."
            : "Preencha os dados para cadastrar um novo associado."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome completo do associado"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentId">CPF *</Label>
            <Input
              id="documentId"
              name="documentId"
              value={formData.documentId}
              onChange={handleChange}
              placeholder="000.000.000-00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Endereço completo"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasBPC"
              checked={formData.hasBPC}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="hasBPC">Beneficiário do BPC</Label>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {existingData ? "Atualizar" : "Cadastrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AssociateForm;
