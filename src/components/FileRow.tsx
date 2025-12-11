import { Download, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileIcon from "./FileIcon";
import { FileItem } from "@/types/files";
import { isViewableInBrowser, shouldOpenInNewTab } from "@/utils/fileViewingUtils";

interface FileRowProps {
  file: FileItem;
  index: number;
  onView?: (file: FileItem) => void;
}

const FileRow = ({ file, index, onView }: FileRowProps) => {
  const isViewable = isViewableInBrowser(file.name);
  const openInNewTab = shouldOpenInNewTab(file.name);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    if (openInNewTab) {
      window.open(file.url, '_blank');
    } else if (onView) {
      onView(file);
    }
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
      <div className="flex items-center gap-2 flex-shrink-0">
        {isViewable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleView}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors gap-2"
          >
            {openInNewTab ? (
              <ExternalLink className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            View
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default FileRow;
