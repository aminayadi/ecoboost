import { IUserExtra, NewUserExtra } from './user-extra.model';

export const sampleWithRequiredData: IUserExtra = {
  id: 'b0a61fea-d9b5-4b53-abe2-046899456cb3',
};

export const sampleWithPartialData: IUserExtra = {
  id: '1de62c7a-81c5-41f5-b22d-b8f8e97e6f2f',
  phone: '1-315-777-6959',
};

export const sampleWithFullData: IUserExtra = {
  id: 'a69c55c6-2fdb-4ef2-a380-1f8512d68342',
  phone: '1-405-735-4539 x2661',
};

export const sampleWithNewData: NewUserExtra = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
