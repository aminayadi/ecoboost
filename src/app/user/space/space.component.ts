import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit, OnDestroy {

  displayMenu= true;

  constructor(private authServivce: AuthService) {
    this.authServivce.isNotlogPage?.next(false);
  }

  ngOnInit(): void {  console.log("init compoenent");
  }


displaymenu():void {
  this.displayMenu =!this.displayMenu;
}

ngOnDestroy(): void {
  this.authServivce.isNotlogPage?.next(true);
}
}
