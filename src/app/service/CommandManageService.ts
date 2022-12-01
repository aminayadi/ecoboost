import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ApplicationUserDTO } from "../model/ApplicationUserDTO";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StockEntityPerProductDTO } from "../model/StockEntityPerProductDTO";
import { CommandDTO } from "../model/CommandDTO";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable()
export class CommandManageService {
  pickUpCommandByDelivery(selectedCommand: CommandDTO) {
    return this.http
    .post(environment.stockmanagement + "CommandManagementRest/pickUpCommandByDelivery", selectedCommand);
  }
  listCommandsPerDelivery(deliveryId: number, rows: any, from: any) {
    return this.http
      .get(environment.stockmanagement + "CommandManagementRest/listCommandsPerDelivery?deliveryId=" + deliveryId + '&rows=' + rows + '&from=' + from);
  }

  validateCommandByAdmin(selectedCommand: CommandDTO) {
    return this.http 
    .post(environment.stockmanagement + "CommandManagementRest/validateCommandByAdmin", selectedCommand);
  }
   
  constructor(private http: HttpClient) { }
  attachACommandToADelivery(selectedCommand: CommandDTO) {
    return this.http
      .post(environment.stockmanagement + "CommandManagementRest/attachACommandToADelivery", selectedCommand);
  }
  createInitialCommand(stockRequestDTO: CommandDTO) {


    return this.http
      .post(environment.stockmanagement + "CommandManagementRest/createInitialCommand", stockRequestDTO);

  }
  listCommandsPerAdmin(adminId: number, rows, from) {
    return this.http
      .get(environment.stockmanagement + "CommandManagementRest/listCommandsPerAdmin?adminId=" + adminId + '&rows=' + rows + '&from=' + from);

  }
  listCommandsPerAgent(agentId: number, rows, from) {
    return this.http
      .get(environment.stockmanagement + "CommandManagementRest/listCommandsPerAgent?agentId=" + agentId + '&rows=' + rows + '&from=' + from);
  }
}