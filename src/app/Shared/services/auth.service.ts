

  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { BehaviorSubject, Observable } from 'rxjs';
  import { Injectable } from '@angular/core';


  
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private http: HttpClient) { }
    isNotlogPage?: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


    login(username: string, password: string): Observable<any> {
      //return this.http.post('http://54.36.180.8:8083/api/authenticate', {
      return this.http.post('http://localhost:8083/api/authenticate', {
        'username' : username,
        'password' : password
      }, httpOptions);
    }
  
    register(username: string, email: string, password: string): Observable<any> {
      //return this.http.post('http://54.36.180.8:8083/api/register', {
      return this.http.post('http://localhost:8083/api/register', {
        'login' : username,
        'email' : email,
        'password' : password
      }, httpOptions);
    }
  }
