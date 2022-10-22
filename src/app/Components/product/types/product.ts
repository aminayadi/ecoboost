export class Product {

  name:string;
  image:any;
  imgname:string;
  description:string;
  rating:number;
  volume:number;
  code: string;
  reduction:number;
  pricetogo:number;
  pricenej:number;
  pricecot:number;
  priceseneg:number;
  priceghan:number;

  devisetogo:string ;
  devisenej:string ;
  devisecot:string ;
  deviseseneg:string;
  deviseghan:string;

  constructor() {
    this.name= '';
    this.image= '';
    this.imgname= '';
    this.description= '';
    this.rating= 0;
    this.volume= 0;
    this.code= '';
    this.pricetogo= 0;
    this.pricenej= 0;
    this.pricecot= 0;
    this.priceseneg= 0;
    this.priceghan= 0;
    this.devisetogo= '';
    this.devisenej= '';
    this.devisecot= '';
    this.deviseseneg= '';
    this.deviseghan= '';
    this.reduction=0;
  }


}



export interface ProductDto {
  name:string;
  image:any;
  description:string;
  rating:number;
  volume:number;
  code: string;
  reduction:number;
  previewsPrice: number;
  price:number;
  devise:string;
}
