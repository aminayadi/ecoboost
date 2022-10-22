import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product, ProductDto } from './types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  ProductsDto: ProductDto[] = [];

  constructor(private productServ: ProductService) {}

  ngOnInit(): void {
    this.productServ.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.ProductsDto = this.inintProductDto(this.products);
      console.log('data=', data);
    });
  }
  inintProductDto(products: Product[]): ProductDto[] {
    let tempProductsDto: ProductDto[] = [];

    products.forEach((product) => {
      const prdoctDto: ProductDto = {
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
      tempProductsDto.push(prdoctDto);
    });

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
