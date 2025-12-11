import { Folder, HardDrive } from "lucide-react";
import FileList, { FileItem } from "@/components/FileList";

// Demo files - replace with your actual file data
const demoFiles: FileItem[] = [
  { name: "Project_Proposal.pdf", size: "2.4 MB", url: "#" },
  { name: "Annual_Report_2024.xlsx", size: "1.8 MB", url: "#" },
  { name: "team_photo.jpg", size: "4.2 MB", url: "#" },
  { name: "presentation_slides.pptx", size: "12.5 MB", url: "#" },
  { name: "meeting_notes.txt", size: "24 KB", url: "#" },
  { name: "source_code.zip", size: "8.7 MB", url: "#" },
  { name: "design_mockup.png", size: "3.1 MB", url: "#" },
  { name: "podcast_episode.mp3", size: "45.2 MB", url: "#" },
  { name: "tutorial_video.mp4", size: "128 MB", url: "#" },
  { name: "config.json", size: "4 KB", url: "#" },
];

const Index = () => {
  const folderName = "Shared Files";
  const totalFiles = demoFiles.length;

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
        {/* Folder Info */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className="p-3 rounded-xl bg-secondary">
            <Folder className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{folderName}</h2>
            <p className="text-muted-foreground">
              {totalFiles} {totalFiles === 1 ? 'file' : 'files'}
            </p>
          </div>
        </div>

        {/* File List */}
        <FileList files={demoFiles} folderName={folderName} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container max-w-4xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Drag files here or update the file list to add new items</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
