import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart } from '../../Components/cart/types/cart';
import { DetailCart } from '../../Components/cart/types/detailCart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private Baskfin: BehaviorSubject<DetailCart[]> = new BehaviorSubject<DetailCart[]>([])

  mybasket: BehaviorSubject<Cart> = new BehaviorSubject({
    globalQuantity: 0,
    myBasket: [
      {
        codeProduct: '',
        quantity: 0,
        latestModif: new Date(),
      },
    ],
  });

  constructor(private cookieService: CookieService) {
    const isThereACart = this.cookieService.get('myCart');
    if (isThereACart != '') {
      const basket = JSON.parse(this.cookieService.get('myCart'));
      this.mybasket.next(basket);
    }
  }

  getfinalBusket(): DetailCart[] {
    // we can improve this by yusing cookies service instead using localstorage, but after activation to secure cookie
    //Specify SameSite=None and Secure if the cookie should be sent in cross-site requests. This enables third-party use.
   const tabProduct: DetailCart[] = JSON.parse(
      localStorage.getItem('Baskfin')!
    );
    return tabProduct;
  }

  setfinalBusket(detailCart: DetailCart[]): void {
    // we can improve this by yusing cookies service, but after activation to secure cookie
    //Specify SameSite=None and Secure if the cookie should be sent in cross-site requests. This enables third-party use.
    localStorage.setItem('Baskfin', JSON.stringify(detailCart));
  }

  setProductInCookieandBasket(codeProduct: string): void {
    const index: number = this.getIndexInCart(codeProduct);
    if (index != -1) {
      let myCart: Cart = this.mybasket.value;
      this.incrementNumberItemFromCookiesAndBasket(index);
    }
  }

  setNewItem(detail: DetailCart[]): void {
    const jsonCart = JSON.stringify(detail);
   // this.cookieService.set('Baskfin', jsonCart);
   this.Baskfin.next(detail);
  }

  getItem(): DetailCart[] {
    const tabProduct: DetailCart[] = JSON.parse(
      this.cookieService.get('Baskfin')
    );
    return tabProduct;
  }

  public getIndexInCart(codeProduct: string): number {
    type ProductForm = { codeProduct: string; quantity: number };
    const arrayProduct: ProductForm[] = this.mybasket.value.myBasket;
    const index: number = arrayProduct.findIndex(
      (prod: ProductForm) => prod.codeProduct === codeProduct
    );
    return index;
  }
  getQuantityofProduct(code: string): number {
    const index = this.getIndexInCart(code);
    if (index != -1) {
      const Qty: number = this.getQuatityFromIndex(index);
      return Qty;
    } else return 0;
  }

  getQuatityFromIndex(index: number): number {
    const myCart = this.mybasket.value;
    const qty: number = myCart.myBasket[index].quantity;
    return qty;
  }
  setNewProductInCookiesAndBasket(code: string, qte: number): void {
    const myCart: Cart = this.mybasket.value;
    myCart.globalQuantity = myCart.globalQuantity + qte;
    myCart.myBasket.push({
      codeProduct: code,
      quantity: qte,
      latestModif: new Date(),
    });
    this.updateCookiesAndBasket(myCart);
  }

  eliminateItemFromCookies(code: string) {
    const index: number = this.getIndexInCart(code);
    if (index != -1)
      if (this.checkNumberofItemProduct(index) > 0)
        this.decrementNumberItemFromCookiesAndBasket(index);
  }

  private checkNumberofItemProduct(index: number): number {
    let myCart: Cart = this.mybasket.value;
    const Qte: number = myCart.myBasket[index].quantity;
    return Qte;
  }

  private decrementNumberItemFromCookiesAndBasket(index: number) {
    let myCart: Cart = this.mybasket.value;
    myCart.globalQuantity--;
    myCart.myBasket[index].quantity--;
    myCart.myBasket[index].latestModif = new Date();
    this.updateCookiesAndBasket(myCart);
  }

  public incrementNumberItemFromCookiesAndBasket(index: number) {
    let myCart: Cart = this.mybasket.value;
    myCart.globalQuantity++;
    myCart.myBasket[index].quantity++;
    myCart.myBasket[index].latestModif = new Date();
    this.updateCookiesAndBasket(myCart);
  }

  deleteProductFromCookieAndBasket(code: string): void {
    const index: number = this.getIndexInCart(code);
    if (index != -1) {
      let myCart: Cart = this.mybasket.value;
      const nbre: number = myCart.myBasket[index].quantity;
      myCart.myBasket.splice(index, 1);
      myCart.globalQuantity = myCart.globalQuantity - nbre;
      this.updateCookiesAndBasket(myCart);
    }
  }

  updateCookiesAndBasket(Cart: Cart) {
    const jsonCart = JSON.stringify(Cart);
    this.cookieService.set('myCart', jsonCart);
    //update mybasket
    this.mybasket.next(Cart);
  }

  cleanCookiesAndBasket(): void {
    this.cookieService.delete('myCart');

    //update mybasket
    this.mybasket.next({
      globalQuantity: 0,
      myBasket: [
        {
          codeProduct: '',
          quantity: 0,
          latestModif: new Date(),
        },
      ],
    });
  }

  isExistInBasket(code: string): boolean {
    return this.getIndexInCart(code) == -1 ? false : true;
  }
}
