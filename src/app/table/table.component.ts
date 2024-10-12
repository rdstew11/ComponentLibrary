import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CdkTableModule } from "@angular/cdk/table";
import { PeriodSnapshot } from '../amortization';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TableDataSource } from './datasource';
import { Paginator } from '../paginator/paginator.component';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CdkTableModule, CurrencyPipe, DatePipe, Paginator],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class Table implements AfterViewInit, OnChanges {
    displayColumns = ['date', 'balance', 'principal_amount', 'interest_amount', 'fees_amount'];

    @Input()
    data: Observable<PeriodSnapshot[]> = new Observable<PeriodSnapshot[]>();

    dataSource!: TableDataSource<PeriodSnapshot>;

    @ViewChild(Paginator)
    paginator!: Paginator;

    constructor() {
        this.dataSource = new TableDataSource<PeriodSnapshot>(of([]));
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && this.data) {
            this.dataSource.data = this.data;
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }


}
