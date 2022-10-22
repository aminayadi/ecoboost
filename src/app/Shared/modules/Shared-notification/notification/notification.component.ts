import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  @Input() update: boolean = false;
  @Input() delete: boolean = false;
  @Input() add: boolean = false;
  @Input() productName: string = '';
  @Input() nbreItem: number = 0;

  constructor() {}

  ngOnInit(): void {
    console;
  }
}
