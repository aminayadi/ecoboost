import { ApplicationUserDTO } from "./ApplicationUserDTO";
import { CommandStatus } from "./CommandStatus";
import { ProductDTO } from "./ProductDTO"; 
import { UnitVolume } from "./UnitVolume";

 
export class CommandDTO {
  
    id:number | undefined;
    unitVolumeQuantity:number| 0;
    unitVolume:UnitVolume;
    stockQuantityInCarton:number| 0;
    stockQuantitySingle:number| 0;
    productDTO:ProductDTO;
    relatedAgent:ApplicationUserDTO;
    commandStatus:CommandStatus;
  relatedDelivery: ApplicationUserDTO;
}