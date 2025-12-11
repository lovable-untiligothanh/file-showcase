import { Folder, ChevronRight } from "lucide-react";
import { FolderItem } from "@/types/files";

interface FolderRowProps {
  folder: FolderItem;
  onOpen: (folder: FolderItem) => void;
  index: number;
}

const FolderRow = ({ folder, onOpen, index }: FolderRowProps) => {
  const itemCount = folder.children.length;
  
  return (
    <button
      onClick={() => onOpen(folder)}
      className="w-full file-row-hover flex items-center justify-between px-4 py-3 rounded-lg bg-card border border-border/50 opacity-0 animate-fade-in text-left"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
          <Folder className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground break-all">{folder.name}</p>
          <p className="text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
    </button>
  );
};

export default FolderRow;
