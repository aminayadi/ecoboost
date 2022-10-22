import { Product, ProductDto } from './../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../../../Shared/services/cart.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  qte: number = 0;
  code: string = '';
  product?: ProductDto;
  isAddedInBasket: boolean = false;
  productName: string = '';
  nbreItem: number = 0;
  //for notification
  isUpdateProduct: boolean = false;
  isAddProduct: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private productServ: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.router.paramMap
      .pipe(
        switchMap((param: any) => {
          const code: string = param.get('idp')!;
          if (code != null) {
            this.initCartProduct(code);
          }
          return this.productServ.getProductByCode(this.code);
        })
      )
      .subscribe((data) => {
        this.product = this.inintProductDto(data);
        console.log('valeur data=', data);
      });
  }

  initCartProduct(code: string) {
    this.code = code;
    this.qte = this.cartService.getQuantityofProduct(this.code);
    this.isAddedInBasket = this.cartService.isExistInBasket(this.code);
  }

  increment(): void {
    if (!this.isAddedInBasket) this.qte++;
    else {
      this.qte++;
      this.cartService.setProductInCookieandBasket(this.code);
      this.isUpdateProduct = true;
      setTimeout(() => {
        this.isUpdateProduct = false;
      }, 2000);
    }
  }

  decrement(): void {
    if (this.qte > 0) {
      if (!this.isAddedInBasket) this.qte--;
      else {
        this.qte--;
        this.cartService.eliminateItemFromCookies(this.code);
        this.isUpdateProduct = true;
        setTimeout(() => {
          this.isUpdateProduct = false;
        }, 2000);
      }
    }

    if (this.qte == 0) {
      this.cartService.deleteProductFromCookieAndBasket(this.code);
      this.isAddedInBasket = false;
    }
  }

  addToCart(): void {
    if (this.qte > 0) {
      this.cartService.setNewProductInCookiesAndBasket(this.code, this.qte);
      this.isAddedInBasket = true;
      this.isAddProduct = true;
      this.productName = this.product?.name!;
      this.nbreItem = this.qte;
      setTimeout(() => {
        this.isAddProduct = false;
      }, 2000);
    }
  }

  inintProductDto(product: Product): ProductDto {
    const tempProductsDto: ProductDto = {
      name: product.name,
      image: this.getimage(product.image),
      description: product.description,
      rating: product.rating,
      volume: product.volume,
      code: product.code,
      reduction: product.reduction,
      price: product.pricetogo,
      devise: product.devisetogo,
      previewsPrice: this.getPriceAfterReduction(
        product.pricetogo,
        product.reduction
      ),
    };

    return tempProductsDto;
  }

  getPriceAfterReduction(price: number, reduce: number) {
    if (reduce > 0) {
      const sumWithReduce: number = price + (price * reduce) / 100;
      return this.sumAfterFix(sumWithReduce);
    } else return price;
  }

  sumAfterFix(sumWithReduce: number): number {
    return parseFloat(sumWithReduce.toFixed(2));
  }

  private getimage(data: string): any {
    return 'data:image/jpg;base64,' + data;
  }
}
