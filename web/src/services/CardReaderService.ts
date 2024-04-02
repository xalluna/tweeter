import { apiRoutes } from '../routes/index';
import { CardDisplayDto } from '../types/cards';
import { apiCall } from './helpers/apiCall';

export type CardReaderService = typeof CardReaderService;

export const CardReaderService = {
  readCard: async (file: ArrayBuffer) => {
    return await apiCall<CardDisplayDto>({
      method: 'POST',
      endpoint: apiRoutes.readCard,
      data: file,
      options: {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    });
  },
};
