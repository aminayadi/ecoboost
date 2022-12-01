import { ApplicationUserDTO } from "./ApplicationUserDTO";

export class AppNotificationDTO {
    text:String;
    applicationUserDTO:ApplicationUserDTO;
    ack:boolean=false;
    id:number;
}