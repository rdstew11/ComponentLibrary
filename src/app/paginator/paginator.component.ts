import { of, Observable, BehaviorSubject } from "rxjs";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableService } from "../table/table.service";
import { FormsModule } from "@angular/forms";
export interface PaginatorState {
    index: number;
    countPerPage: number;
}

@Component(
    {
        selector: 'rds-paginator',
        standalone: true,
        imports: [CommonModule, FormsModule],
        providers: [TableService],
        templateUrl: './paginator.component.html',
        styleUrl: './paginator.component.css'
    }
)
export class RdsPaginator {
    countPerPage: number = 12;
    private index$ = new BehaviorSubject<number>(0);
    private countPerPage$ = new BehaviorSubject<number>(this.countPerPage);
    private countOptions$ = new BehaviorSubject<number[]>([12, 36, 48, 60, 120]);

    constructor(private tableService: TableService) { }

    onPageIndexUpdate() {
        return this.index$;
    }

    updatePageIndex(index: number) {
        this.index$.next(index);
    }

    onCountPerPageUpdate() {
        return this.countPerPage$;
    }

    updateCountPerPage() {
        this.countPerPage$.next(this.countPerPage);
    }

    onCountOptionsUpdate() {
        return this.countOptions$;
    }

    getPageButtons(): Observable<number[]> {
        return of([1, 2, 3, 4, 5, 6]);
    }


}