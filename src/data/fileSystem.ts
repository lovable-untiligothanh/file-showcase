import { FileSystemItem } from "@/types/files";

// Demo file system - replace with your actual file structure
export const fileSystem: FileSystemItem[] = [
  {
    name: "Documents",
    type: "folder",
    children: [
      { name: "Project_Proposal.pdf", size: "2.4 MB", url: "#", type: "file" },
      { name: "Annual_Report_2024.xlsx", size: "1.8 MB", url: "#", type: "file" },
      { name: "meeting_notes.txt", size: "24 KB", url: "#", type: "file" },
      {
        name: "Contracts",
        type: "folder",
        children: [
          { name: "Client_Agreement.pdf", size: "1.2 MB", url: "#", type: "file" },
          { name: "NDA_Template.docx", size: "85 KB", url: "#", type: "file" },
        ]
      }
    ]
  },
  {
    name: "Images",
    type: "folder",
    children: [
      { name: "team_photo.jpg", size: "4.2 MB", url: "#", type: "file" },
      { name: "design_mockup.png", size: "3.1 MB", url: "#", type: "file" },
      { name: "logo.svg", size: "12 KB", url: "#", type: "file" },
      {
        name: "Screenshots",
        type: "folder",
        children: [
          { name: "dashboard_v1.png", size: "890 KB", url: "#", type: "file" },
          { name: "dashboard_v2.png", size: "1.1 MB", url: "#", type: "file" },
          { name: "mobile_view.png", size: "450 KB", url: "#", type: "file" },
        ]
      }
    ]
  },
  {
    name: "Media",
    type: "folder",
    children: [
      { name: "podcast_episode.mp3", size: "45.2 MB", url: "#", type: "file" },
      { name: "tutorial_video.mp4", size: "128 MB", url: "#", type: "file" },
      { name: "background_music.wav", size: "22 MB", url: "#", type: "file" },
    ]
  },
  {
    name: "Source Code",
    type: "folder",
    children: [
      { name: "index.html", size: "8 KB", url: "#", type: "file" },
      { name: "styles.css", size: "15 KB", url: "#", type: "file" },
      { name: "app.tsx", size: "4 KB", url: "#", type: "file" },
      { name: "config.json", size: "2 KB", url: "#", type: "file" },
    ]
  },
  { name: "presentation_slides.pptx", size: "12.5 MB", url: "#", type: "file" },
  { name: "source_code.zip", size: "8.7 MB", url: "#", type: "file" },
  { name: "README.md", size: "4 KB", url: "#", type: "file" },
];
