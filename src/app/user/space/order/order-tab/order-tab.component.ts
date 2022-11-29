import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order-tab',
  templateUrl: './order-tab.component.html',
  styleUrls: ['./order-tab.component.scss']
})
export class OrderTabComponent /*implements OnInit*/ {
  status: boolean=false;

  constructor(private route:ActivatedRoute) { }

  critaire:any;
  titre = '';

  ngOnInit(): void {

    this.route.paramMap.subscribe((param: ParamMap) =>{
      this.critaire = param.get('criteria');
      console.log('la valeur de parmthis.critaire=', this.critaire );
      if (this.critaire == 'all' ) { this.titre= 'All orders'; this.status= true;}
      else if (this.critaire == 'ready' ) { this.titre= 'Ready for delivery'; this.status= false;}
      else { this.titre= 'Pending orders'; this.status= false;}

    });
  }

}
