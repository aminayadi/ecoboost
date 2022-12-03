import { Cart } from '../cart/types/cart';
import { CartService } from '../../Shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Shared/services/token-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  username?: string;

  badgeCart: number = 0;

  constructor(private cartService: CartService,
    private tokenStorageService: TokenStorageService) {

    this.cartService.mybasket.subscribe((val: Cart) => {
      this.badgeCart = val.globalQuantity;
    });

  }

  ngOnInit(): void {
    console;
  }
}
