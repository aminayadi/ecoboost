import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayMenu: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log('init compoenent');
  }

  switchDisplayIcon(): void {
    this.displayMenu = !this.displayMenu;
  }
}
