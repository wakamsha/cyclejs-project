import { DocumentType } from '../constants/VO';
import { DocumentsCreateRequestItem } from '@cyclejs-project/api/dist/lf-webapp-model';

export function makeDocumentsCreateParam(
  url: string,
  file: File,
  documentType: DocumentType,
): DocumentsCreateRequestItem {
  return {
    file_data: JSON.stringify({
      id: `${url
        .split(/\/|\?/)
        .slice(5, -1)
        .join('/')}`,
      metadata: {
        filename: file.name,
        mime_type: file.type,
        size: file.size,
      },
      storage: 'document_cache',
    }),
    filename: file.name,
    type: documentType,
  };
}
