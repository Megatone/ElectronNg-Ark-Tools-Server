import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AssistantService {

    private orderSource = new Subject<number>();
    private confirmedSource = new Subject<number>();

    order$ = this.orderSource.asObservable();
    confirmed$ = this.confirmedSource.asObservable();

    public ordenate(order: number): void {
        this.orderSource.next(order);
    }

    public confirm(confirmation: number): void {
        this.confirmedSource.next(confirmation);
    }
}
