import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 'c442dfc5-f1e3-4a23-b568-16f6b07dcadc',
};

export const sampleWithPartialData: IProduct = {
  id: '3153fe3a-45b5-4084-becc-d552abe2c137',
  name: 'calculate',
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  description: 'Loaf withdrawal architectures',
  volume: 39072,
  code: 'Global',
  priceghan: 72826,
  devisetogo: 'transmitter Horizontal',
  devisenej: 'Progressive',
  devisecot: 'monitor feed',
};

export const sampleWithFullData: IProduct = {
  id: 'fc4d92e5-b6d0-47a5-a4eb-7f6530bf165f',
  name: 'Plains Towels',
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  imgname: 'program green Dobra',
  description: 'Shirt Adaptive',
  rating: 15438,
  volume: 33924,
  code: 'B2C Incredible',
  reduction: 64480,
  pricetogo: 14899,
  pricenej: 4388,
  pricecot: 73291,
  priceseneg: 45596,
  priceghan: 29566,
  devisetogo: 'Mauritius Account Soap',
  devisenej: 'deposit Computer synthesize',
  devisecot: 'indigo quantifying transmitter',
  deviseseneg: 'Global networks',
  deviseghan: 'Data Grocery Salad',
};

export const sampleWithNewData: NewProduct = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
