import { FileType } from '../constants/VO';
import { fileTypeMatchers } from '../constants/Record';

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

export function filterValidFilesBySize(files: File[], maxSize: number): File[] {
  return files.filter(({ size }) => size <= maxSize);
}

export function filterFilesByType(files: File[], fileTypes: FileType[] = []): File[] {
  return fileTypes.length
    ? files.filter(file => fileTypes.some(fileType => file.name.match(fileTypeMatchers[fileType])))
    : files;
}
