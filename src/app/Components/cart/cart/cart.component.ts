import { Router } from '@angular/router';
import { CartService } from '../../../Shared/services/cart.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../product/services/product.service';
import { Product, ProductDto } from '../../product/types/product';
import { DetailCart } from '../types/detailCart';
import { Cart } from '../types/cart';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  myBasket?: Cart;
  copymyBasket?: Cart;

  detailCartProduct: DetailCart[] = [];
  private copyDetailCArtProduct: DetailCart[] = [];
  sum: number = 0;
  sumWithReduce: number = 0;
  notifier = new Subject();
  canOrder: boolean = false;
  isUpdateProduct: boolean = false;
  listOtherProduct: ProductDto[] = [];

  constructor(
    private productServ: ProductService,
    private cartService: CartService,
    private route: Router
  ) {}
  @ViewChild('shopModal') myModal: any;

  ngOnInit(): void {
    //the number of products very limited(5 products), we can get all them,
    this.productServ
      .getProducts()
      .pipe(takeUntil(this.notifier))
      .subscribe((data: Product[]) => {
        this.products = data;
        this.initDetailProduct(data);
        this.listOtherProduct = this.inintProductDto(data);
      });
  }

  private initDetailProduct(products: Product[]): void {
    this.myBasket = this.cartService.mybasket.value;
    this.copymyBasket = Object.assign({}, this.myBasket);

    this.canOrder = this.myBasket.globalQuantity > 0 ? false : true;
    this.myBasket.myBasket.forEach((elemnt) => {
      const index = this.getindexInProduct(elemnt.codeProduct);
      if (index != -1) {
        const detailCartProd: DetailCart = this.getDetailProduct(
          this.products[index],
          elemnt.quantity
        );
        this.detailCartProduct.push(detailCartProd);
      }
    });

    this.copyDetailCArtProduct = Object.assign([], this.detailCartProduct);
  }

  private getDetailProduct(product: Product, Qty: number): DetailCart {
    const PriceWithRemise: number =
      (product.pricetogo - (product.pricetogo / 100) * product.reduction) * Qty;

    const detailCartProduct: DetailCart = {
      image: this.getimage(product.image),
      name: product.name,
      pricetogo: product.pricetogo,
      reduction: product.reduction,
      PriceWithRemise: PriceWithRemise,

      myBasket: {
        codeProduct: product.code,
        quantity: Qty,
        latestModif: new Date(),
      },
      total: product.pricetogo * Qty,
    };

    this.sum = this.sum + product.pricetogo * Qty;
    this.sumWithReduce = this.sumWithReduce + PriceWithRemise;
    return detailCartProduct;
  }

  inintProductDto(products: Product[]): ProductDto[] {
    const ProductsDto: ProductDto[] = [];

    products.forEach((product) => {
      const index: boolean = this.cartService.isExistInBasket(product.code);
      if (index == false) {
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
        ProductsDto.push(tempProductsDto);
      }
    });

    return ProductsDto;
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

  private getindexInProduct(code: string) {
    const index = this.products.findIndex(
      (element: Product) => element.code == code
    );
    return index;
  }

  get SumAfterFix(): number {
    return parseFloat(this.sumWithReduce.toFixed(2));
  }

  fixSomme(some: number): number {
    return parseFloat(some.toFixed(2));
  }

  private getimage(data: any): any {
    return 'data:image/jpg;base64,' + data;
  }

  cleanCart() {
    this.cartService.cleanCookiesAndBasket();

    this.myBasket = this.cartService.mybasket.value;
    this.products = [];
    this.detailCartProduct = [];
    this.sum = 0;
    this.sumWithReduce = 0;
    this.canOrder = true;
  }

  incrementProduct(i: number): void {
    // update copy  detailcart ++
    this.copyDetailCArtProduct[i].myBasket.quantity++;
    this.copyDetailCArtProduct[i].myBasket.latestModif = new Date();
    this.copyDetailCArtProduct[i].total +=
      this.copyDetailCArtProduct[i].pricetogo;
    const oneProduct: number = this.copyDetailCArtProduct[i].pricetogo;
    const remise: number = this.copyDetailCArtProduct[i].reduction;
    this.copyDetailCArtProduct[i].PriceWithRemise +=
      (oneProduct / 100) * remise;

    // update copy cart cookies ++
    this.copymyBasket!.globalQuantity++;
    const index = this.cartService.getIndexInCart(
      this.detailCartProduct[i].myBasket.codeProduct
    );
    this.copymyBasket!.myBasket[index].quantity++;
    this.copymyBasket!.myBasket[index].latestModif = new Date();
  }

  decrementProduct(i: number): void {
    const qty = this.copyDetailCArtProduct[i].myBasket.quantity;
    const index = this.cartService.getIndexInCart(
      this.detailCartProduct[i].myBasket.codeProduct
    );

    if (qty > 0) {
      // update copy  detailcart ++
      this.copyDetailCArtProduct[i].myBasket.quantity--;
      this.copyDetailCArtProduct[i].myBasket.latestModif = new Date();
      this.copyDetailCArtProduct[i].total -=
        this.copyDetailCArtProduct[i].pricetogo;
      const oneProduct: number = this.copyDetailCArtProduct[i].pricetogo;
      const remise: number = this.copyDetailCArtProduct[i].reduction;
      this.copyDetailCArtProduct[i].PriceWithRemise -=
        (oneProduct / 100) * remise;

      // update copy cart cookies ++
      this.copymyBasket!.globalQuantity--;
      this.copymyBasket!.myBasket[index].quantity--;
      this.copymyBasket!.myBasket[index].latestModif = new Date();
    }
    if (qty == 1) {
      this.copyDetailCArtProduct.splice(i, 1);
      this.copymyBasket!.myBasket.splice(index, 1);
    }
  }

  saveUpdateCart(): void {
    if (this.copymyBasket!.globalQuantity > 0) {
      let sum: number = 0;
      this.detailCartProduct = this.copyDetailCArtProduct;
      this.cartService.updateCookiesAndBasket(this.copymyBasket!);
      this.detailCartProduct.forEach((elem) => {
        elem.myBasket.latestModif = new Date();
        elem.PriceWithRemise =
          elem.myBasket.quantity *
          ((1 - elem.reduction / 100) * elem.pricetogo);
        sum += elem.PriceWithRemise;
      });
      this.sumWithReduce = sum;
    } else {
      this.cartService.cleanCookiesAndBasket();
      this.detailCartProduct = [];
      this.sumWithReduce = 0;
    }
    this.isUpdateProduct = true;

    setTimeout(() => {
      this.isUpdateProduct = false;
    }, 2500);
  }

  eliminateProduct(i: number): void {
    const code = this.detailCartProduct[i]?.myBasket.codeProduct;
    this.cartService.deleteProductFromCookieAndBasket(code);
    this.detailCartProduct.splice(i, 1);
  }

  close(): void {
    location.reload();
  }

  orderProced(): void {
    this.cartService.setfinalBusket(this.detailCartProduct);
    this.route.navigate(['/my-cart/initiate']);
  }

  ngOnDestroy(): void {
    this.notifier.next;
    this.notifier.complete();
  }
}
