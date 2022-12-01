import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class BrokerService {


    // Observable
    private valueSelectedSource = new Subject<number>();

    // Observable number streams
    valueSelected$ = this.valueSelectedSource.asObservable();

    // Service commands
    sendMessageToLoadNotification(value: number) {
      
        this.valueSelectedSource.next(value);
    }
}