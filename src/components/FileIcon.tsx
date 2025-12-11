import { File, FileText, Image, Music, Video, Archive, Code, FileSpreadsheet, Presentation } from "lucide-react";

interface FileIconProps {
  filename: string;
  className?: string;
}

const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

const FileIcon = ({ filename, className = "h-6 w-6" }: FileIconProps) => {
  const ext = getFileExtension(filename);
  
  const iconMap: Record<string, { icon: typeof File; color: string }> = {
    // Documents
    pdf: { icon: FileText, color: "text-red-500" },
    doc: { icon: FileText, color: "text-blue-500" },
    docx: { icon: FileText, color: "text-blue-500" },
    txt: { icon: FileText, color: "text-muted-foreground" },
    md: { icon: FileText, color: "text-muted-foreground" },
    
    // Images
    jpg: { icon: Image, color: "text-emerald-500" },
    jpeg: { icon: Image, color: "text-emerald-500" },
    png: { icon: Image, color: "text-emerald-500" },
    gif: { icon: Image, color: "text-emerald-500" },
    svg: { icon: Image, color: "text-orange-500" },
    webp: { icon: Image, color: "text-emerald-500" },
    
    // Audio
    mp3: { icon: Music, color: "text-purple-500" },
    wav: { icon: Music, color: "text-purple-500" },
    ogg: { icon: Music, color: "text-purple-500" },
    
    // Video
    mp4: { icon: Video, color: "text-pink-500" },
    mov: { icon: Video, color: "text-pink-500" },
    avi: { icon: Video, color: "text-pink-500" },
    webm: { icon: Video, color: "text-pink-500" },
    
    // Archives
    zip: { icon: Archive, color: "text-amber-500" },
    rar: { icon: Archive, color: "text-amber-500" },
    "7z": { icon: Archive, color: "text-amber-500" },
    tar: { icon: Archive, color: "text-amber-500" },
    gz: { icon: Archive, color: "text-amber-500" },
    
    // Code
    js: { icon: Code, color: "text-yellow-500" },
    ts: { icon: Code, color: "text-blue-600" },
    jsx: { icon: Code, color: "text-cyan-500" },
    tsx: { icon: Code, color: "text-cyan-500" },
    html: { icon: Code, color: "text-orange-500" },
    css: { icon: Code, color: "text-blue-400" },
    json: { icon: Code, color: "text-green-500" },
    py: { icon: Code, color: "text-blue-500" },
    
    // Spreadsheets
    xls: { icon: FileSpreadsheet, color: "text-green-600" },
    xlsx: { icon: FileSpreadsheet, color: "text-green-600" },
    csv: { icon: FileSpreadsheet, color: "text-green-600" },
    
    // Presentations
    ppt: { icon: Presentation, color: "text-orange-600" },
    pptx: { icon: Presentation, color: "text-orange-600" },
  };
  
  const { icon: Icon, color } = iconMap[ext] || { icon: File, color: "text-muted-foreground" };
  
  return <Icon className={`${className} ${color}`} />;
};

export default FileIcon;
