
export interface Cart {
  
  globalQuantity: number;

  myBasket: [{
    codeProduct: string;
    quantity: number;
    latestModif: Date;
  }];
}
