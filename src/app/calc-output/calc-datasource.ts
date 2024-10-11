import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { map, combineLatestWith, Observable, of } from "rxjs";
import { CalcPaginator, PaginatorState } from "./calc-paginator";

export class CalcDataSource<T> extends DataSource<T> {
    private _data: Observable<T[]>;
    private paginator: CalcPaginator;

    constructor(data: T[]) {
        super();
        this._data = of(data);
        this.paginator = new CalcPaginator({
            currentIndex: 0,
            countPerPage: 12,
        });
    }

    override connect(collectionViewer: CollectionViewer): Observable<readonly T[]> {
        return this._data.pipe(
            combineLatestWith(this.paginator.onPaginatorStateChange()),
            map((data) => this.paginateData(data))
        );

    }

    private paginateData([data, paginatorState]: [T[], PaginatorState]): T[] {
        const startIdx = paginatorState.index * paginatorState.countPerPage;
        let endIdx = startIdx + paginatorState.countPerPage;
        if (endIdx > data.length) { endIdx = data.length; }
        return data.slice(startIdx, endIdx);
    }

    override disconnect(collectionViewer: CollectionViewer): void {
    }
}