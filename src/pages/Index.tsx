import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Folder, HardDrive } from "lucide-react";
import FileList from "@/components/FileList";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fileSystem } from "@/data/fileSystem.generated";
import { FolderItem, FileSystemItem } from "@/types/files";

// Helper to find folder by path segments
const findFolderPath = (items: FileSystemItem[], pathSegments: string[]): FolderItem[] => {
  const result: FolderItem[] = [];
  let currentItems = items;

  for (const segment of pathSegments) {
    const folder = currentItems.find(
      (item): item is FolderItem => item.type === 'folder' && item.name === segment
    );
    if (!folder) break;
    result.push(folder);
    currentItems = folder.children;
  }

  return result;
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Derive path from URL
  const path = useMemo(() => {
    const pathParam = searchParams.get('path');
    if (!pathParam) return [];
    const segments = pathParam.split('/').filter(Boolean);
    return findFolderPath(fileSystem, segments);
  }, [searchParams]);
  
  // Get current items based on path
  const getCurrentItems = (): FileSystemItem[] => {
    if (path.length === 0) return fileSystem;
    return path[path.length - 1].children;
  };

  const handleOpenFolder = (folder: FolderItem) => {
    const newPath = [...path, folder];
    const pathString = newPath.map(f => f.name).join('/');
    setSearchParams({ path: pathString });
  };

  const handleNavigate = (index: number) => {
    if (index === -1) {
      setSearchParams({});
    } else {
      const newPath = path.slice(0, index + 1);
      const pathString = newPath.map(f => f.name).join('/');
      setSearchParams({ path: pathString });
    }
  };

  const currentItems = getCurrentItems();
  const currentFolderName = path.length > 0 ? path[path.length - 1].name : "Shared Files";
  const folderCount = currentItems.filter(i => i.type === 'folder').length;
  const fileCount = currentItems.filter(i => i.type === 'file').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <HardDrive className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">File Browser</h1>
              <p className="text-sm text-muted-foreground">Access and download files</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs path={path} onNavigate={handleNavigate} />
        
        {/* Folder Info */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border mt-4">
          <div className="p-3 rounded-xl bg-secondary">
            <Folder className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{currentFolderName}</h2>
            <p className="text-muted-foreground">
              {folderCount > 0 && `${folderCount} ${folderCount === 1 ? 'folder' : 'folders'}`}
              {folderCount > 0 && fileCount > 0 && ', '}
              {fileCount > 0 && `${fileCount} ${fileCount === 1 ? 'file' : 'files'}`}
              {folderCount === 0 && fileCount === 0 && 'Empty'}
            </p>
          </div>
        </div>

        {/* File List */}
        <FileList items={currentItems} onOpenFolder={handleOpenFolder} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container max-w-4xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Add files to public/files/ folder — auto-scanned during build</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
