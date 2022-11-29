import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reseller-map',
  templateUrl: './reseller-map.component.html',
  styleUrls: ['./reseller-map.component.scss'],
})
export class  ResellerMapComponent implements OnInit {
  zoom: number = 9;
  // initial center position for the map
  lat: number = 9.496377881306302;
  lng: number = -1.0218491578244169;

  coordinates = [
    { pays: 'Senegal', lat: 14.999962133939732, lng: -14.756712378806336, adress: 'ecoboostxb@lumgint.com // www.lumgint.com' },
    { pays: 'Ghana', lat: 7.988562724868017, lng: -1.2687007042367937, adress: '2nd Street Manu Avenue,Accra. Ghana' },
    { pays: 'Cote dvoir', lat: 7.686544936347032, lng: -5.860167692086838, adress: 'LGI CI: Riviera Bonoumin - Cocody îlot 76, lot 1025, parcelle 163, TF 91200Abidjan - Côte d Ivoire. RCCM No: CI-ABJ-2020-B-03225 CC No: 2012647 T CNPS No: 361611 Code Import-Export No: 20045024M' },
    { pays: 'Nigeria', lat: 9.741068677452693, lng: 7.452314987422907, adress: 'ecoboostxb@lumgint.com // www.lumgint.com' },
    { pays: 'Togo', lat: 6.229294019390012, lng: 1.1696568363261794, adress: 'Abobokome Non loin du FUCEC' },
  ];
  icomMap= 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  googleMapType = 'satellite';
  constructor() {}

  ngOnInit(): void {
    console;
  }
}
