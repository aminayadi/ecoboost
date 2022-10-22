export interface DetailCart {

  image: any;
  name: string;
  pricetogo: number;
  reduction: number;
  PriceWithRemise:number;

  myBasket: {
    codeProduct: string;
    quantity: number;
    latestModif: Date;
  }
  total:number;
  
}
