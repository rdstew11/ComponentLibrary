import { Component, OnInit } from '@angular/core';
import { CalcInputComponent } from "../calc-input/calc-input.component";
import { AmortizationSchedule, Loan, PeriodSnapshot } from '../amortization';
import { Table } from "../table/table.component";
import { BehaviorSubject } from 'rxjs';
import { GraphConfig, RdsGraph } from "../graph/graph.component";

@Component({
    selector: 'calculator',
    standalone: true,
    imports: [CalcInputComponent, Table, RdsGraph],
    templateUrl: './calculator.component.html',
    styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
    periods: PeriodSnapshot[] = [];
    graphData: number[] = [];
    graphConfig: GraphConfig = {
        width: 1920,
        height: 1080
    };


    constructor() { }

    addLoan(loan: Loan) {
        this.periods = loan.schedule.periods;
        this.graphData = this.periods.map((period: PeriodSnapshot) => {
            return period.final_balance;
        });
    }
}
