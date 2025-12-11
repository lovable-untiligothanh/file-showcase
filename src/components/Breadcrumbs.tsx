import { ChevronRight, Home } from "lucide-react";
import { FolderItem } from "@/types/files";

interface BreadcrumbsProps {
  path: FolderItem[];
  onNavigate: (index: number) => void;
}

const Breadcrumbs = ({ path, onNavigate }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center gap-1 text-sm overflow-x-auto pb-2">
      <button
        onClick={() => onNavigate(-1)}
        className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
      >
        <Home className="h-4 w-4" />
        <span>Root</span>
      </button>
      
      {path.map((folder, index) => (
        <div key={index} className="flex items-center gap-1 flex-shrink-0">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          <button
            onClick={() => onNavigate(index)}
            className={`px-2 py-1 rounded-md transition-colors ${
              index === path.length - 1
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {folder.name}
          </button>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
