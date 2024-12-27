import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RdsPaginator } from '../paginator/paginator.component';
import { TableService } from './table.service';
import { RdsColDef, RdsTableCell, RdsDateCell, RdsCurrencyCell } from './table_columns';
import { RdsDataSource } from './data-source';

@Component({
    selector: 'table-component',
    standalone: true,
    imports: [CommonModule, RdsPaginator, RdsTableCell],
    providers: [TableService],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class Table<T> implements AfterViewInit {
    displayColumns = ['date', 'balance', 'principal_amount', 'interest_amount', 'fees_amount'];

    @Input()
    set data(data: T[]) {
        this.datasource.data = data;
    }

    columns: RdsColDef[] = [
        new RdsColDef({ key: 'date', type: RdsDateCell, header: "Date" }),
        new RdsColDef({ key: 'final_balance', type: RdsCurrencyCell, header: "Balance" }),
        new RdsColDef({ key: 'principal_amount', type: RdsCurrencyCell, header: "Principal" }),
        new RdsColDef({ key: 'interest_amount', type: RdsCurrencyCell, header: "Interest" }),
        new RdsColDef({ key: 'fees_amount', type: RdsCurrencyCell, header: "Fees" })
    ];


    @ViewChild(RdsPaginator)
    paginator!: RdsPaginator;

    datasource: RdsDataSource<T> = new RdsDataSource();

    constructor() {
    }


    ngAfterViewInit(): void {
        this.datasource.paginator = this.paginator;
    }



}
