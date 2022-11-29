import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  displayDash = false;
  displayOrder = false;
  displayPurchase = false;

  constructor() { }


  accordDash(): void {
  this.displayDash = !this.displayDash
  this.displayPurchase = false;
  }

  accordOrder(): void {
  this.displayOrder = !this.displayOrder;
  this.displayPurchase = false;

}

  accordPurchase(): void {
    this.displayPurchase = !this.displayPurchase
    this.displayDash = false;

  }

}
