import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import { Component, Input, OnInit } from "@angular/core";
import { TableInternalService } from "../table/table.service";

export interface PaginatorState {
    index: number;
    countPerPage: number;
}

@Component(
    {
        selector: 'paginator',
        standalone: true,
        imports: [],
        providers: [TableInternalService],
        templateUrl: './paginator.component.html',
        styleUrl: './paginator.component.css'
    }
)
export class Paginator implements OnInit {
    private _state$!: BehaviorSubject<PaginatorState>;
    private _destroy$!: Subject<void>;

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

    public updateCurrentIndex(index: number) {
        this.index = index;
        this.updatePaginatorState();
    }

    public updateCountPerPage(count: number) {
        this.countPerPage = count;
        this.updatePaginatorState();
    }

    private updatePaginatorState() {
        this._state$.next({
            index: this.index,
            countPerPage: this.countPerPage
        });
    }

    public onPaginatorStateChange(): Observable<PaginatorState> {
        return this._state$;
    }
}