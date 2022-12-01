import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ApplicationUserDTO } from "../model/ApplicationUserDTO";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StockEntityPerProductDTO } from "../model/StockEntityPerProductDTO";
import { StockRequestDTO } from "../model/StockRequestDTO";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable()
export class StockRequestService {
 
 
  constructor(private http: HttpClient) { }
  createInitialStockRequest(stockRequestDTO: StockRequestDTO) {
  

    return this.http
      .post(environment.stockmanagement + "StockManagementRest/createInitialStockRequest", stockRequestDTO);

  }
  listStockRequestPerAdmin(adminId: number,rows,from){
    return this.http
    .get(environment.stockmanagement + "StockManagementRest/listStockRequestPerAdmin?adminId=" + adminId+'&rows='+rows+'&from='+from );

  }
  listStockRequestPerAgent(agentId: number,rows,from) {
    return this.http
    .get(environment.stockmanagement + "StockManagementRest/listStockRequestPerAgent?agentId=" + agentId+'&rows='+rows+'&from='+from );
  }
}