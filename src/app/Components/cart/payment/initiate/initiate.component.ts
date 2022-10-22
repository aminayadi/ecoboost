import { locale } from 'src/assets/locale';
import { countries } from 'src/assets/countries';

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { DetailCart } from '../../types/detailCart';
import { CartService } from 'src/app/Shared/services/cart.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-initiate',
  templateUrl: './initiate.component.html',
  styleUrls: ['./initiate.component.scss'],
  animations: [routerTransition()],
})
export class InitiateComponent implements OnInit {

  public isCollapsed = true;
  CountriesData: any;
  payweb3Form?: FormGroup;
  submitted = false;
  localeData: any;
  summ: number = 0;
  myBasketfinal: DetailCart[] = [];

  //
  snippet: boolean= false;
  payweb3Request?: FormGroup;
  totaleSum: number = 0;
  paywebData: { [key: string]: any } = {};
  PAY_REQUEST_ID = '';
  CHECKSUM = '';
  encrypt_key = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private http: HttpClient,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {

    this.CountriesData = countries;
    this.localeData = locale;

    this.payweb3Form = this.fb.group({
      PAYGATE_ID: ['10011072130', Validators.required],
      REFERENCE: ['pgtest_123456789', Validators.required],
      AMOUNT: ['3299', Validators.required],
      CURRENCY: ['ZAR', Validators.required],
      RETURN_URL: ['https://my.return.url/page', Validators.required],
      TRANSACTION_DATE: ['2018-01-01 12:00:00', Validators.required],
      LOCALE: ['en-za', Validators.required],
      COUNTRY: ['ZAF', Validators.required],
      EMAIL: ['support@paygate.co.za', [Validators.required, Validators.email]],
      PAY_METHOD: [''],
      PAY_METHOD_DETAIL: [''],
      NOTIFY_URL: [''],
      USER1: [''],
      USER2: [''],
      USER3: [''],
      VAULT_ID: [''],
      VAULT: [''],
      ENCRYPTION_KEY: ['secret', Validators.required],
    });

    this.myBasketfinal = this.cartService.getfinalBusket();
    // we can optimise this function by sending array of code Product to backend, and get
    //the sum directly for backend
    this.myBasketfinal.forEach(element=> this.totaleSum+=element.PriceWithRemise)
    this.cartService.setNewItem(this.myBasketfinal);
  }

  generateReference() {
    return 'pgtest_' + moment().format('YYYYMMDDHHmmss'); // formatting date and time according to requirement
  }

  onSubmit() {
    this.snippet= true;
    this.submitted = true;
    if (this.payweb3Form?.invalid) {
      console.log(this.payweb3Form, 'invalid form');
      return; // return if form is invalid
    }

    let payweb3FormString = '';
    let encrypt_key: any;
    const formdata: any = {};
    const payweb3Data = Object.entries(this.payweb3Form?.value);
    payweb3Data.forEach(([key, value]) => {
      if (key !== 'ENCRYPTION_KEY') {
        if (value !== '') {
          payweb3FormString += value;
          formdata[key] = value; // storing form data except empty values and encryption key in a string
        }
      } else {
        encrypt_key = value;
      }
    });

    const checksum = CryptoJS.MD5(payweb3FormString + encrypt_key); // calculating checksum using MD5 for  encryption of data

    formdata['CHECKSUM'] = checksum.toString();
    console.log('formdata', formdata);
    localStorage.setItem('payweb3_initiate', JSON.stringify(formdata)); // setting values in localstorage for further use

    this.paymentService.initiatePaiyment(formdata).subscribe((data) => {
      if (data) {
        const res = (data as string).split('&'); // removing & from response string
        res.forEach((element) => {
          const d = element.split('=');
          if (d[0] === 'PAY_REQUEST_ID') {
            localStorage.setItem('PAY_REQUEST_ID', d[1]); // setting values in localstorage for further use
            localStorage.setItem('ENCRYPTION_KEY', encrypt_key);
          }
        });
        this.snippet= false;
        this.router.navigate(['./my-cart/request']); // After initiating request navigate to request page
      }
    });
  }
}
