import FileRow from "./FileRow";
import { Folder } from "lucide-react";

export interface FileItem {
  name: string;
  size: string;
  url: string;
}

interface FileListProps {
  files: FileItem[];
  folderName: string;
}

const FileList = ({ files, folderName }: FileListProps) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-16">
        <Folder className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">This folder is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border-b border-border mb-4">
        <span className="flex-1">Name</span>
        <span className="w-24 text-right hidden sm:block">Size</span>
        <span className="w-28"></span>
      </div>
      {files.map((file, index) => (
        <FileRow 
          key={file.name} 
          name={file.name} 
          size={file.size} 
          url={file.url}
          index={index}
        />
      ))}
    </div>
  );
};

export default FileList;
