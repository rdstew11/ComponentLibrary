import { BehaviorSubject, ReplaySubject, combineLatestWith, map } from "rxjs";
import { RdsPaginator } from "../paginator/paginator.component";

interface PaginatorValues {
    countPerPage: number;
    index: number;
}


export class RdsDataSource<T> {

    private _data: BehaviorSubject<T[]> = new BehaviorSubject(([] as T[]));
    private _filterValues: BehaviorSubject<any> = new BehaviorSubject([]);
    private _sortValues: BehaviorSubject<any> = new BehaviorSubject([]);
    private _pageValues: ReplaySubject<PaginatorValues> = new ReplaySubject();

    finalData: BehaviorSubject<T[]> = new BehaviorSubject(([] as T[]));

    set data(data: T[]) {
        console.log("Data assigned");
        this._data.next(data);
    }

    private _paginator!: RdsPaginator;

    set paginator(paginator: RdsPaginator) {
        this._paginator = paginator;
        if (paginator) {
            console.log("Paginator true");
            const countPerPage$ = this._paginator.onCountPerPageUpdate();
            const pageIndex$ = this._paginator.onPageIndexUpdate();
            countPerPage$.pipe(
                combineLatestWith(pageIndex$),
                map(([count, index]) => {
                    return {
                        countPerPage: count,
                        index: index
                    };
                })
            ).subscribe((values: PaginatorValues) => {
                console.log("Sending next");
                this._pageValues.next(values);
            });
        }
    }

    get paginator() {
        return this._paginator;
    }

    constructor() {
        this.renderData();
    }


    renderData(): void {
        const filteredData = this._data.pipe(
            combineLatestWith(this._filterValues),
            map(([data, filterValue]) => this.filterData(data, filterValue))
        ).pipe(
            combineLatestWith(this._sortValues),
            map(([data, sortValues]) => this.sortData(data, sortValues))
        ).pipe(
            combineLatestWith(this._pageValues),
            map(([data, pageValues]) => this.paginateData(data, pageValues))
        );

        filteredData.subscribe((data) => {
            this.finalData.next(data);
        });

    }

    private filterData(data: T[], filterValue: any): T[] {
        console.log("Filtering data");
        return data;
    }

    private sortData(data: T[], sortValue: any): T[] {
        console.log("Sorting Data");
        return data;
    }

    private paginateData(data: T[], pageValues: PaginatorValues): T[] {
        const startIdx = pageValues.index * pageValues.countPerPage;
        let endIdx = startIdx + pageValues.countPerPage;

        if (endIdx > data.length) { endIdx = data.length; }

        return data.slice(startIdx, endIdx);
    }

}