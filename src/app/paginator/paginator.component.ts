import { of, Observable } from "rxjs";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableService } from "../table/table.service";
export interface PaginatorState {
    index: number;
    countPerPage: number;
}

@Component(
    {
        selector: 'paginator',
        standalone: true,
        imports: [CommonModule],
        providers: [TableService],
        templateUrl: './paginator.component.html',
        styleUrl: './paginator.component.css'
    }
)
export class RdsPaginator {

    constructor(private tableService: TableService) { }

    updateCurrentIndex(index: number): void {
        this.tableService.updatePageIndex(index);
    }

    updateCountPerPage(count: number): void {
        this.tableService.updateCountPerPage(count);
    }

    getPageButtons(): Observable<number[]> {
        return of([1, 2, 3, 4, 5, 6]);
    }

    getPageCountOptions(): Observable<number[]> {
        return this.tableService.onCountOptionsUpdate();
    }
}