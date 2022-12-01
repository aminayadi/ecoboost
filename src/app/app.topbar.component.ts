import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ApplicationUserDTO } from './model/ApplicationUserDTO';
import { AppHelper } from './AppHelper';
import { AppNotificationDTO } from './model/AppNotificationDTO';
import { NotificationService } from './service/notificationService';
import { BrokerService } from './service/BrokerService';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ["./app.topbar.components.scss"],
    providers: [NotificationService]
})
export class AppTopBarComponent implements OnInit {

    items: MenuItem[];
    numberOfNotifications: number;

    listOfNotification: AppNotificationDTO[];
    constructor(public appMain: AppMainComponent, private brokerService: BrokerService, private notificationService: NotificationService) { }
    ngOnInit(): void {
        this.brokerService.valueSelected$.subscribe(
            (valueFromSubscribtion) => {
                this.loadNotifications();
            });
        this.loadNotifications();

    }
    ackNotification(notification:AppNotificationDTO)
    {
        this.notificationService.ackNotification(notification).subscribe(resp => {
         this.loadNotifications();

        });
    }
    loadNotifications() {
        let applicationUser: ApplicationUserDTO = AppHelper.getConnectedUser();

        this.notificationService.getNotification(applicationUser.id).subscribe(resp => {
            this.listOfNotification = <AppNotificationDTO[]>resp;
            this.numberOfNotifications = this.listOfNotification.length;

        });
    }

    logout() {
        localStorage.clear();
    }
}
