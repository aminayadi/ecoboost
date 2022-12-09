import { IUser } from 'app/entities/user/user.model';

export interface IUserExtra {
  id: string;
  phone?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewUserExtra = Omit<IUserExtra, 'id'> & { id: null };