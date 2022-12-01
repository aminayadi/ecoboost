import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ApplicationUserDTO } from "../model/ApplicationUserDTO";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommandDTO } from "../model/CommandDTO";
import { UserType } from "../model/UserType";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable()
export class UserManagementService {
 
  listAllDelivery(adminId: number) {
    return this.http
    .get(environment.usermanagement + "UserManagementRest/listAllDelivery?adminId=" + adminId);
  }
  updateApplicationUser(applicationUserDTO: ApplicationUserDTO) {
    return this.http
    .post(environment.usermanagement + "UserManagementRest/updateApplicationUser", applicationUserDTO);
  }
  createApplicationUser(applicationUserDTO: ApplicationUserDTO) {
    
    return this.http
      .post(environment.usermanagement + "UserManagementRest/createApplicationUser", applicationUserDTO);
  }
  deleteUserType(applicationUserDTO: ApplicationUserDTO) {
    return this.http
    .delete(environment.usermanagement + "UserManagementRest/deleteUserType/"+ applicationUserDTO.id);
  }
  deleteAdmin(applicationUserDTO: ApplicationUserDTO) {
    return this.http
    .delete(environment.usermanagement + "UserManagementRest/deleteAdminApplicationUser/"+ applicationUserDTO.id);
  }
  updateAdminUser(applicationUserDTO: ApplicationUserDTO) {
    
    return this.http
      .post(environment.usermanagement + "UserManagementRest/editAdminApplicationUser", applicationUserDTO);

  }
  loadAdminsPerPage(_rows: number, pageLinks: number) {
    return this.http
      .get(environment.usermanagement + "UserManagementRest/loadAdminsPerPage?rows=" + _rows + "&pageLinks=" + pageLinks);
  }
  loadUsersPerPage(userType:UserType,_rows: number, pageLinks: number) {
    return this.http
      .get(environment.usermanagement + "UserManagementRest/loadUsersPerPage?rows=" + _rows + "&pageLinks=" + pageLinks+"&userType="+userType.toString());
  }

  
  constructor(private http: HttpClient) { }
  public createAdminApplicationUser(adminApplicationUserDTO: ApplicationUserDTO) {


    return this.http
      .post(environment.usermanagement + "UserManagementRest/createAdminApplicationUser", adminApplicationUserDTO);

  }


 
}
