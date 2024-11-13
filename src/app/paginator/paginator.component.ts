import { BehaviorSubject, Observable } from "rxjs";
import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

export interface PaginatorState {
    index: number;
    countPerPage: number;
}

@Component(
    {
        selector: 'paginator',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './paginator.component.html',
        styleUrl: './paginator.component.css'
    }
)
export class Paginator implements OnInit {
    private _state$!: BehaviorSubject<PaginatorState>;

    @Input()
    index: number = 0;

    @Input()
    countPerPage: number = 50;

    @Input()
    countOptions: number[] = [5, 10, 25, 50];

    constructor() { }

    ngOnInit(): void {
        this._state$ = new BehaviorSubject({
            index: this.index,
            countPerPage: this.countPerPage
        });
    }

    updateCurrentIndex(index: number) {
        this.index = index;
        this.updatePaginatorState();
    }

    updateCountPerPage(count: number) {
        this.countPerPage = count;
        this.updatePaginatorState();
    }

    private updatePaginatorState() {
        this._state$.next({
            index: this.index,
            countPerPage: this.countPerPage
        });
    }

    onPaginatorStateChange(): Observable<PaginatorState> {
        return this._state$;
    }


    getPageButtons() {
        console.log('getting page buttons');
        return [1, 2, 3, 4, 5, 6];
    }
}