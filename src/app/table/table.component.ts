import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paginator } from '../paginator/paginator.component';
import { TableService } from './table.service';
import { RdsColDef, RdsTableCell, RdsDateCell, RdsCurrencyCell } from './table_columns';

@Component({
    selector: 'table-component',
    standalone: true,
    imports: [CommonModule, Paginator, RdsTableCell],
    providers: [TableService],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class Table {
    displayColumns = ['date', 'balance', 'principal_amount', 'interest_amount', 'fees_amount'];

    @Input()
    data: any[] = [];

    columns: RdsColDef[] = [
        new RdsColDef({ key: 'date', type: RdsDateCell, header: "Date" }),
        new RdsColDef({ key: 'final_balance', type: RdsCurrencyCell, header: "Balance" }),
        new RdsColDef({ key: 'principal_amount', type: RdsCurrencyCell, header: "Principal" }),
        new RdsColDef({ key: 'interest_amount', type: RdsCurrencyCell, header: "Interest" }),
        new RdsColDef({ key: 'fees_amount', type: RdsCurrencyCell, header: "Fees" })
    ];


    @ViewChild(Paginator)
    paginator!: Paginator;

    constructor() {

    }




}
