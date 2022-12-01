import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ApplicationUserDTO } from "../model/ApplicationUserDTO";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }
  public authenticate(email, password, selectedLoginType) {

    selectedLoginType='d';
    return this.http
      .post<any>(environment.usermanagement + "UserManagementRest/authenticate", { email, password,selectedLoginType })
      .pipe(
        map(userData => { 
          sessionStorage.setItem("connectedUser",JSON.stringify(userData.applicationUserDTO));
          let tokenStr = "Bearer " + userData.token;  
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );



    }
  }
