export interface IProduct {
  id: string;
  name?: string | null;
  image?: string | null;
  imageContentType?: string | null;
  imgname?: string | null;
  description?: string | null;
  rating?: number | null;
  volume?: number | null;
  code?: string | null;
  reduction?: number | null;
  pricetogo?: number | null;
  pricenej?: number | null;
  pricecot?: number | null;
  priceseneg?: number | null;
  priceghan?: number | null;
  devisetogo?: string | null;
  devisenej?: string | null;
  devisecot?: string | null;
  deviseseneg?: string | null;
  deviseghan?: string | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
