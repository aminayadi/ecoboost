import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    this.router.url;
   let connectedUserObject= localStorage.getItem("connectedUser");
    if (localStorage.getItem("isLoggedin")&&connectedUserObject!= null) {
      return true;
    } else {
      this.router.navigate(["/"]);
    }
    return false;
  }
}
