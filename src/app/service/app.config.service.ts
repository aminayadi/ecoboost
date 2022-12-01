import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 

@Injectable()
export class ConfigService {

 

    private configUpdate = new Subject ();

    configUpdate$ = this.configUpdate.asObservable();

    updateConfig(config: any) {
       
    }

    getConfig() { 
    }
}
