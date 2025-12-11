import FileRow from "./FileRow";
import FolderRow from "./FolderRow";
import { Folder } from "lucide-react";
import { FileSystemItem, FolderItem, FileItem } from "@/types/files";

interface FileListProps {
  items: FileSystemItem[];
  onOpenFolder: (folder: FolderItem) => void;
  onViewFile?: (file: FileItem) => void;
}

const FileList = ({ items, onOpenFolder, onViewFile }: FileListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <Folder className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">This folder is empty</p>
      </div>
    );
  }

  // Sort: folders first, then files
  const sortedItems = [...items].sort((a, b) => {
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border-b border-border mb-4">
        <span className="flex-1">Name</span>
        <span className="w-24 text-right hidden sm:block">Size</span>
        <span className="w-28"></span>
      </div>
      {sortedItems.map((item, index) => (
        item.type === 'folder' ? (
          <FolderRow 
            key={item.name} 
            folder={item} 
            onOpen={onOpenFolder}
            index={index}
          />
        ) : (
          <FileRow
            key={item.name}
            file={item as FileItem}
            index={index}
            onView={onViewFile}
          />
        )
      ))}
    </div>
  );
};

export default FileList;
