import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppNotificationDTO } from "../model/AppNotificationDTO";

@Injectable()
export class NotificationService {
    ackNotification(apNotificationDTO: AppNotificationDTO) {
      return this.http
      .post<any>(environment.usermanagement + "NotificationRest/ackNotification", apNotificationDTO)
      ;
    }
    constructor(private http: HttpClient) { }
    getNotification(userId) {
    return this.http
      .get(environment.usermanagement + "NotificationRest/getNotification?userId="+userId);
  }
}