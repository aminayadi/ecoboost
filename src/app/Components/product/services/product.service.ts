import { Product } from './../types/product';
import { Cart } from '../../cart/types/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {

  private url = environment.urlProducts;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}`);
  }

  getProductByCode(code: string): Observable<Product> { 
    return this.http
    .get<Product>(environment.urlProducts + "/" + code);

  }

  getGlobalPrice(mycart: Cart): Observable<number> {
    return this.http.post<number>(`${this.url}/price-all-product?mycart=`, mycart);
  }
}
