import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isNotlogPage?: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {

  }




}
