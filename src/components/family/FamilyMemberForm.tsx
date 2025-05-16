
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FamilyMemberFormProps {
  associateId: string;
  existingData?: {
    id?: string;
    name: string;
    relationship: string;
    age: string;
    documentId: string;
    hasBPC: boolean;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const FamilyMemberForm = ({ 
  associateId, 
  existingData, 
  onSubmit, 
  onCancel 
}: FamilyMemberFormProps) => {
  const [formData, setFormData] = useState({
    name: existingData?.name || "",
    relationship: existingData?.relationship || "",
    age: existingData?.age || "",
    documentId: existingData?.documentId || "",
    hasBPC: existingData?.hasBPC || false,
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, relationship: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, hasBPC: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.relationship) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...formData,
      associateId,
      id: existingData?.id || Date.now().toString(),
    });

    toast({
      title: existingData ? "Familiar atualizado" : "Familiar cadastrado",
      description: existingData 
        ? "Os dados do familiar foram atualizados com sucesso."
        : "Novo familiar foi cadastrado com sucesso.",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {existingData ? "Editar Familiar" : "Cadastrar Novo Familiar"}
        </CardTitle>
        <CardDescription>
          {existingData
            ? "Atualize as informações do familiar abaixo."
            : "Preencha os dados para cadastrar um novo familiar."}
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
              placeholder="Nome completo do familiar"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">Parentesco *</Label>
            <Select value={formData.relationship} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o parentesco" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Cônjuge</SelectItem>
                <SelectItem value="child">Filho(a)</SelectItem>
                <SelectItem value="parent">Pai/Mãe</SelectItem>
                <SelectItem value="sibling">Irmão/Irmã</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Idade</Label>
            <Input
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Idade"
              type="number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentId">CPF</Label>
            <Input
              id="documentId"
              name="documentId"
              value={formData.documentId}
              onChange={handleChange}
              placeholder="000.000.000-00"
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

export default FamilyMemberForm;
