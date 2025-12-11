import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileIcon from "./FileIcon";
import { FileItem } from "@/types/files";

interface FileRowProps {
  file: FileItem;
  index: number;
}

const FileRow = ({ file, index }: FileRowProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="file-row-hover flex items-center justify-between px-4 py-3 rounded-lg bg-card border border-border/50 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="flex-shrink-0 p-2 rounded-lg bg-secondary/50">
          <FileIcon filename={file.name} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground truncate">{file.name}</p>
          <p className="text-sm text-muted-foreground">{file.size}</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleDownload}
        className="flex-shrink-0 text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

export default FileRow;
