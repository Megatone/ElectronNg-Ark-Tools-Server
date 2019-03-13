import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameIni } from './models/GameIni';

@Injectable()
export class AssistantService {

    // Observable string sources
    private orderSource = new Subject<number>();
    private confirmedSource = new Subject<number>();

    // Observable string streams
    order$ = this.orderSource.asObservable();
    confirmed$ = this.confirmedSource.asObservable();

    // Service message commands
    ordenate(order: number) {
        this.orderSource.next(order);
    }

    confirm(confirmation: number) {
        this.confirmedSource.next(confirmation);
    }
}