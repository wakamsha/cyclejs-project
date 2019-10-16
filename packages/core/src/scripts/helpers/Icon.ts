import { IconName } from '@cyclejs-project/icon';

export function getIconName(filename: string): IconName {
  const ext = filename
    .toLowerCase()
    .split('.')
    .pop();

  switch (ext) {
    case 'pdf':
      return 'file-pdf';
    case 'doc':
    case 'docx':
      return 'file-word';
    default:
      return 'file-text';
  }
}
