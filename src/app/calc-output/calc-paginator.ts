import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";

export interface PaginatorState {
    index: number;
    countPerPage: number;
}

export class CalcPaginator {
    private _state: PaginatorState;
    private _state$: BehaviorSubject<PaginatorState>;
    private _destroy$: Subject<void>;

    constructor(options?: {
        currentIndex?: number,
        countPerPage?: number;
    }) {

        this._state = {
            index: options?.currentIndex || 0,
            countPerPage: options?.countPerPage || 120
        };
        this._state$ = new BehaviorSubject(this._state);
        this._destroy$ = new Subject();
    }

    public updateCurrentIndex(index: number) {
        this._state.index = index;
        this._state$.next(this._state);
    }

    public updateCountPerPage(count: number) {
        this._state.countPerPage = count;
        this._state$.next(this._state);
    }

    public onPaginatorStateChange(): Observable<PaginatorState> {
        return this._state$.pipe(takeUntil(this._destroy$));
    }

    public destroy() {
        this._destroy$.next();
    }
}