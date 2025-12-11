export interface FileItem {
  name: string;
  size: string;
  url: string;
  type: 'file';
}

export interface FolderItem {
  name: string;
  type: 'folder';
  children: (FileItem | FolderItem)[];
}

export type FileSystemItem = FileItem | FolderItem;
