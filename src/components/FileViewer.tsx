import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, X } from "lucide-react";
import { getViewingMethod } from "@/utils/fileViewingUtils";
import { FileItem } from "@/types/files";

interface FileViewerProps {
  file: FileItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const FileViewer = ({ file, isOpen, onClose }: FileViewerProps) => {
  if (!file) return null;

  const viewingMethod = getViewingMethod(file.name);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(file.url, '_blank');
  };

  const renderFileContent = () => {
    switch (viewingMethod) {
      case 'image':
        return (
          <div className="flex items-center justify-center p-4">
            <img
              src={file.url}
              alt={file.name}
              className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        );

      case 'video':
        return (
          <div className="flex items-center justify-center p-4">
            <video
              controls
              className="max-w-full max-h-[60vh] rounded-lg shadow-lg"
            >
              <source src={file.url} />
              Your browser does not support video playback.
            </video>
          </div>
        );

      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="text-6xl">🎵</div>
            <h3 className="text-lg font-medium">{file.name}</h3>
            <audio
              controls
              className="w-full max-w-md"
            >
              <source src={file.url} />
              Your browser does not support audio playback.
            </audio>
          </div>
        );

      case 'pdf':
        return (
          <div className="w-full h-[70vh] p-4">
            <iframe
              src={file.url}
              className="w-full h-full rounded-lg border"
              title={file.name}
            />
          </div>
        );

      case 'text':
        return (
          <div className="p-4">
            <div className="bg-muted rounded-lg p-4 font-mono text-sm max-h-[60vh] overflow-auto">
              <iframe
                src={file.url}
                className="w-full min-h-[50vh] border-0"
                title={file.name}
              />
            </div>
          </div>
        );

      case 'web':
        return (
          <div className="p-4 text-center space-y-4">
            <p className="text-muted-foreground">
              This file is best viewed in a new tab for full functionality.
            </p>
            <Button onClick={handleOpenInNewTab} className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center space-y-4">
            <p className="text-muted-foreground">
              This file type cannot be previewed in the browser.
            </p>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download to View
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg font-semibold truncate">
                {file.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Size: {file.size}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                New Tab
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="gap-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-auto">
          {renderFileContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewer;