import dayjs from 'dayjs/esm';

export interface ICart {
  id: string;
  globalQuantity?: number | null;
  codeProduct?: string | null;
  quantity?: number | null;
  lastestModif?: dayjs.Dayjs | null;
}

export type NewCart = Omit<ICart, 'id'> & { id: null };
