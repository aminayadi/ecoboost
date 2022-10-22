import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AppError } from 'src/app/Shared/handlingError/appError';
import { unknowError } from 'src/app/Shared/handlingError/unknowError';
import { environment } from 'src/environments/environment';
import { contactus } from '../model/contactus';

  @Injectable({
  providedIn:'any'
})
export class ContactusService {

  private url= environment.urlContact;

  constructor(private http: HttpClient) { }

  sendMessage(data:contactus ): Observable <any> {

 return this.http.post(`${this.url}/add-mail`,data);
  }


}
