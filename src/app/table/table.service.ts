import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    private data$ = new ReplaySubject<any[]>();

    constructor() { }


    updateData(data: any[]) {
        this.data$.next(data);
    }


}
