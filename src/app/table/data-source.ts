import { BehaviorSubject, Observable, combineLatest, filter, map } from "rxjs";
import { RdsPaginator } from "../paginator/paginator.component";


export class RdsDataSource<T> {

    private _data: BehaviorSubject<T[]> = new BehaviorSubject(([] as T[]));
    private _filterValues: BehaviorSubject<any> = new BehaviorSubject([]);
    private _sortValues: BehaviorSubject<any> = new BehaviorSubject([]);
    private _pageValues: BehaviorSubject<any> = new BehaviorSubject([]);

    finalData: BehaviorSubject<T[]> = new BehaviorSubject(([] as T[]));

    set data(data: T[]) {
        console.log("Data assigned");
        this._data.next(data);
    }

    private _paginator!: RdsPaginator;

    set paginator(paginator: RdsPaginator) {
        this.paginator = paginator;
    }

    get paginator() {
        return this._paginator;
    }

    constructor() {
        this.renderData();
    }


    renderData(): void {
        const filteredData = combineLatest([this._data, this._filterValues]).pipe(
            map(([data, filterValue]) => this.filterData(data, filterValue))
        );
        const sortedData = combineLatest([filteredData, this._sortValues]).pipe(
            map(([data, sortValues]) => this.sortData(data, sortValues))
        );
        const pageData = combineLatest([sortedData, this._pageValues]).pipe(
            map(([data, pageValues]) => this.paginateData(data, pageValues))
        );

        pageData.subscribe((data) => {
            this.finalData.next(data);
        });

    }

    private filterData(data: T[], filterValue: any): T[] {
        return data;
    }

    private sortData(data: T[], sortValue: any): T[] {
        return data;
    }

    private paginateData(data: T[], pageValues: any): T[] {
        return data;
    }

}