import { ProductDTO } from "./ProductDTO";
import { UnitVolume } from "./UnitVolume";

 
export class StockEntityPerProductDTO {
  
    id:number | undefined;
    unitVolumeQuantity:number| 0;
    unitVolume:UnitVolume;
    stockQuantityInCarton:number| 0;
    stockQuantitySingle:number| 0;
    productDTO:ProductDTO;
}