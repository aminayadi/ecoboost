import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  isNotlogPage?: boolean = true;

  constructor(private authServivce: AuthService) {
    this.authServivce.isNotlogPage?.subscribe((value: boolean) => {
      this.isNotlogPage = value;
    });
  }

  ngOnInit(): void {
    console;
  }
}
