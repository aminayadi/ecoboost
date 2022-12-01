import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { LoginService } from 'src/app/service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `], providers: [LoginService]
})

export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];
  password: string;
  email: string;
  userType: String;
  availableLoginTypes: LoginType[];
  subscription: Subscription;
  displayError: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.availableLoginTypes = [
      { name: 'Agent', code: 'Agent' }, { name: 'Admin', code: 'Admin' }, { name: 'SuperAdmin', code: 'SuperAdmin' }, { name: 'Manager', code: 'Manager' }
    ];


  }
  public authenticate(): void {

    let thiss = this;
    this.loginService.authenticate(this.email, this.password, this.userType).subscribe(resp => {
      if (resp == null) {
        thiss.displayError = true;
      }
      else {
        let tokenStr = "Bearer " + resp.token;
        localStorage.setItem("connectedUser", JSON.stringify(resp.applicationUserDTO));
     
        localStorage.setItem("token", tokenStr);
        localStorage.setItem("isLoggedin", "true");
        thiss.router.navigate(["/mainapp"]);
      }
    }, (err: HttpErrorResponse) => { thiss.displayError = true; });


  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
interface LoginType {
  name: string,
  code: string
}