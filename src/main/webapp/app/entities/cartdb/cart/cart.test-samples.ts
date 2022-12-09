import dayjs from 'dayjs/esm';

import { ICart, NewCart } from './cart.model';

export const sampleWithRequiredData: ICart = {
  id: '8decf029-cc1a-4fc6-b857-a64cf5a2293d',
};

export const sampleWithPartialData: ICart = {
  id: '107116c7-7b6e-49a4-a3e8-8cf9b6a11a81',
  codeProduct: 'Principal online',
  quantity: 64644,
};

export const sampleWithFullData: ICart = {
  id: '7616edf1-f85d-4cdb-bd54-4428cd73ddc0',
  globalQuantity: 1443,
  codeProduct: 'connecting teal Liaison',
  quantity: 9550,
  lastestModif: dayjs('2022-10-04'),
};

export const sampleWithNewData: NewCart = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
