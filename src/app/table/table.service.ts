import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    private index$ = new BehaviorSubject<number>(0);
    private countPerPage$ = new BehaviorSubject<number>(0);
    private countOptions$ = new BehaviorSubject<number[]>([12, 24, 36, 48, 60, 120, 360]);

    private data$ = new ReplaySubject<any[]>();

    constructor() { }

    onPageIndexUpdate() {
        return this.index$;
    }

    updatePageIndex(index: number) {
        this.index$.next(index);
    }

    onCountPerPageUpdate() {
        return this.countPerPage$;
    }

    updateCountPerPage(count: number) {
        this.countPerPage$.next(count);
    }

    onCountOptionsUpdate() {
        return this.countOptions$;
    }

    updateCountOptions(options: number[]) {
        this.countOptions$.next(options);
    }

    updateData(data: any[]) {
        this.data$.next(data);
    }


}
