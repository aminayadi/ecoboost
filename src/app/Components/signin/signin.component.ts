import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  displyAgent: boolean = false;
  displayCustomer = false;
  displayDeliver = false;

  constructor(private authServivce: AuthService) {
    this.authServivce.isNotlogPage?.next(false);
  }

  ngOnInit(): void {
    console.log('init compoenent');
  }

  get displaychoice() {
    return !(this.displyAgent || this.displayCustomer || this.displayDeliver);
  }

  displayCustomerForm() {
    return (this.displayCustomer = true);
  }

  displayAgentForm() {
    this.displyAgent = true;
  }

  displayDeliveryForm() {
    return (this.displayDeliver = true);
  }

  ngOnDestroy(): void {
    this.authServivce.isNotlogPage?.next(true);
  }
}
