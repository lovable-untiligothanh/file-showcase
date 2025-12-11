/**
 * Utility functions for determining file viewing capabilities
 */

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const isViewableInBrowser = (filename: string): boolean => {
  const ext = getFileExtension(filename);

  const viewableExtensions = new Set([
    // Images
    'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico',

    // Documents
    'pdf', 'txt', 'md',

    // Web files
    'html', 'htm', 'css', 'js', 'json', 'xml',

    // Media files (with browser support)
    'mp4', 'webm', 'ogg', 'mp3', 'wav', 'oga',

    // Other text formats
    'csv', 'tsv', 'log'
  ]);

  return viewableExtensions.has(ext);
};

export const getViewingMethod = (filename: string): 'image' | 'pdf' | 'text' | 'video' | 'audio' | 'web' | null => {
  const ext = getFileExtension(filename);

  // Image files
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'].includes(ext)) {
    return 'image';
  }

  // PDF files
  if (ext === 'pdf') {
    return 'pdf';
  }

  // Text files
  if (['txt', 'md', 'csv', 'tsv', 'log', 'json', 'xml'].includes(ext)) {
    return 'text';
  }

  // Video files
  if (['mp4', 'webm', 'ogg'].includes(ext)) {
    return 'video';
  }

  // Audio files
  if (['mp3', 'wav', 'oga'].includes(ext)) {
    return 'audio';
  }

  // Web files
  if (['html', 'htm', 'css', 'js'].includes(ext)) {
    return 'web';
  }

  return null;
};

export const shouldOpenInNewTab = (filename: string): boolean => {
  const ext = getFileExtension(filename);

  // These file types are better viewed in new tab
  const newTabExtensions = new Set([
    'pdf', 'html', 'htm', 'css', 'js'
  ]);

  return newTabExtensions.has(ext);
};