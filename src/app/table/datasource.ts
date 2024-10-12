import { Directive } from "@angular/core";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { map, combineLatestWith, Observable, of, BehaviorSubject, Subscription } from "rxjs";
import { Paginator, PaginatorState } from "../paginator/paginator.component";


export class TableDataSource<T> extends DataSource<T> {
    private _data: Observable<T[]>;
    private _paginator: Paginator | undefined;
    private _renderedData: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    private _renderedDataSubscription: Subscription | null = null;

    set data(data: Observable<T[]>) {
        this._data = data;
    }

    set paginator(comp: Paginator) {
        this._paginator = comp;
        this.onDataChanges();
    }

    get paginator(): Paginator | undefined {
        return this._paginator;
    }

    constructor(data: Observable<T[]>) {
        super();
        this._data = data;
        this.onDataChanges();
    }

    override connect(collectionViewer: CollectionViewer): Observable<readonly T[]> {
        if (!this._renderedDataSubscription) {
            this.onDataChanges();
        }
        return this._renderedData;
    }

    private onDataChanges() {
        const pageChanges = this._paginator ? this._paginator.onPaginatorStateChange() : of(null);
        console.log(pageChanges);
        const paginateData = this._data.pipe(
            combineLatestWith(pageChanges),
            map((data) => this.paginateData(data))
        );

        this._renderedDataSubscription?.unsubscribe();
        this._renderedDataSubscription = paginateData.subscribe((data) => { this._renderedData.next(data); console.log(data); });

    }

    private paginateData([data, paginatorState]: [T[], PaginatorState | null]): T[] {
        console.log(paginatorState);
        if (paginatorState) {
            const startIdx = paginatorState.index * paginatorState.countPerPage;
            let endIdx = startIdx + paginatorState.countPerPage;
            if (endIdx > data.length) { endIdx = data.length; }
            return data.slice(startIdx, endIdx);
        }
        else {
            return data;
        }

    }

    override disconnect(collectionViewer: CollectionViewer): void {
    }
}