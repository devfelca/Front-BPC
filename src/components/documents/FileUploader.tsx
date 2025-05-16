
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  onFileUpload?: (file: File) => void;
  onFilesSelected?: (files: File[]) => void;
  allowedTypes?: string[];
  maxSize?: number; // in MB
  multiple?: boolean;
}

const FileUploader = ({ 
  onFileUpload,
  onFilesSelected,
  allowedTypes = ["application/pdf", "image/jpeg", "image/png"], 
  maxSize = 5,
  multiple = false
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      if (multiple) {
        validateAndUploadFiles(Array.from(files));
      } else {
        validateAndUploadFile(files[0]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (multiple) {
        validateAndUploadFiles(Array.from(e.target.files));
      } else {
        validateAndUploadFile(e.target.files[0]);
      }
    }
  };

  const validateAndUploadFiles = (files: File[]) => {
    const validFiles: File[] = [];
    
    for (const file of files) {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Erro no upload",
          description: "Tipo de arquivo não permitido. Por favor, envie um PDF ou imagem.",
          variant: "destructive",
        });
        continue;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "Erro no upload",
          description: `O arquivo ${file.name} é muito grande. O tamanho máximo permitido é ${maxSize}MB.`,
          variant: "destructive",
        });
        continue;
      }
      
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;
    
    // Simulate upload progress
    let progress = 0;
    setUploadProgress(progress);
    
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Complete upload after 100%
        setTimeout(() => {
          if (onFilesSelected) {
            onFilesSelected(validFiles);
          }
          setUploadProgress(null);
          toast({
            title: "Upload concluído",
            description: `${validFiles.length} arquivo(s) foram enviados com sucesso.`,
          });
        }, 500);
      }
      setUploadProgress(progress);
    }, 300);
  };

  const validateAndUploadFile = (file: File) => {
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Erro no upload",
        description: "Tipo de arquivo não permitido. Por favor, envie um PDF ou imagem.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Erro no upload",
        description: `O arquivo é muito grande. O tamanho máximo permitido é ${maxSize}MB.`,
        variant: "destructive",
      });
      return;
    }

    // Simulate upload progress
    let progress = 0;
    setUploadProgress(progress);
    
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Complete upload after 100%
        setTimeout(() => {
          if (onFileUpload) {
            onFileUpload(file);
          }
          if (onFilesSelected) {
            onFilesSelected([file]);
          }
          setUploadProgress(null);
          toast({
            title: "Upload concluído",
            description: `O arquivo ${file.name} foi enviado com sucesso.`,
          });
        }, 500);
      }
      setUploadProgress(progress);
    }, 300);
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-6 transition-all ${
        isDragging 
          ? "border-indigo-500 bg-indigo-50" 
          : "border-gray-300 hover:border-gray-400"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center py-4">
        <Upload className="h-10 w-10 text-indigo-500 mb-4" />
        
        <p className="text-lg font-medium mb-2">
          Arraste e solte arquivos aqui
        </p>
        <p className="text-sm text-gray-500 mb-4">
          ou clique para selecionar {multiple ? "arquivos" : "um arquivo"}
        </p>
        
        <Label htmlFor="file-upload" className="cursor-pointer">
          <Button variant="outline">Selecionar {multiple ? "arquivos" : "arquivo"}</Button>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept={allowedTypes.join(",")} 
            multiple={multiple}
          />
        </Label>
        
        <p className="mt-2 text-xs text-gray-500">
          PDF, JPG ou PNG (max. {maxSize}MB)
        </p>
      </div>

      {uploadProgress !== null && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Enviando...</span>
            <span className="text-sm">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
