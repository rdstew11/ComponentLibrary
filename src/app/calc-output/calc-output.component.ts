import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CdkTableModule } from "@angular/cdk/table";
import { PeriodSnapshot } from '../amortization';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CalcDataSource } from './calc-datasource';

@Component({
    selector: 'calc-output',
    standalone: true,
    imports: [CdkTableModule, CurrencyPipe, DatePipe],
    templateUrl: './calc-output.component.html',
    styleUrl: './calc-output.component.css'
})
export class CalcOutputComponent implements OnChanges {
    displayColumns = ['date', 'balance', 'principal_amount', 'interest_amount', 'fees_amount'];

    @Input()
    data: PeriodSnapshot[] = [];

    dataSource: CalcDataSource<PeriodSnapshot[]> = new CalcDataSource([]);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            console.log(changes['data']);
            this.dataSource = new CalcDataSource(changes['data'].currentValue);
            console.log(this.dataSource);
        }
    }
}
