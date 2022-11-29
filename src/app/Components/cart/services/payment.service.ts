import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class PaymentService {
  
  constructor(private http: HttpClient) {}

  initiatePaiyment(formdata: any): Observable<any> {
    return this.http.post(
      environment.apiURL + '/payweb3/initiate.trans',
      formdata
    );
  }

  queryPaiyment(formdata: any): Observable<any> {
    return this.http.post(
      environment.apiURL + '/my-cart/query.trans',
      formdata
    );
  }
}
