import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ApplicationUserDTO } from "../model/ApplicationUserDTO";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StockEntityPerProductDTO } from "../model/StockEntityPerProductDTO";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable()
export class StockManagmentService {
  updateStockEntityPerProductDTO(stockEntityPerProductDTO: StockEntityPerProductDTO) {
    return this.http
    .post(environment.stockmanagement + "StockManagementRest/updateStockEntityPerProductDTO", stockEntityPerProductDTO);
  }
  constructor(private http: HttpClient) { }
  public listAllStockEntityPerProductDTO(adminId) {
    return this.http
    .get(environment.stockmanagement + "StockManagementRest/listAllStockEntityPerProductDTO?adminId=" + adminId );



    }
  }
 