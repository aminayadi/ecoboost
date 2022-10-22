import { Cart } from '../cart/types/cart';
import { CartService } from '../../Shared/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  badgeCart: number = 0;

  constructor(private cartService: CartService) {

    this.cartService.mybasket.subscribe((val: Cart) => {
      this.badgeCart = val.globalQuantity;
    });

  }

  ngOnInit(): void {
    console;
  }
}
