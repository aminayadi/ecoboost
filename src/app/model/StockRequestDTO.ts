import { ApplicationUserDTO } from "./ApplicationUserDTO";
import { ProductDTO } from "./ProductDTO";
import { StockStatus } from "./stockStatus";
import { UnitVolume } from "./UnitVolume";

 
export class StockRequestDTO {
  
    id:number | undefined;
    unitVolumeQuantity:number| 0;
    unitVolume:UnitVolume;
    stockQuantityInCarton:number| 0;
    stockQuantitySingle:number| 0;
    productDTO:ProductDTO;
    relatedAgent:ApplicationUserDTO;
    stockStatus:StockStatus;
}