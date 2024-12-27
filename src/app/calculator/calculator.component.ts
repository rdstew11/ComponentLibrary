import { Component, OnInit } from '@angular/core';
import { CalcInputComponent } from "../calc-input/calc-input.component";
import { AmortizationSchedule, Loan, PeriodSnapshot } from '../amortization';
import { Table } from "../table/table.component";
import { BehaviorSubject } from 'rxjs';
import { RdsGraph } from "../graph/graph.component";

@Component({
    selector: 'calculator',
    standalone: true,
    imports: [CalcInputComponent, Table, RdsGraph],
    templateUrl: './calculator.component.html',
    styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
    periods!: PeriodSnapshot[];

    constructor() {
        this.periods = [];
    }

    addLoan(loan: Loan) {
        this.periods = loan.schedule.periods;
    }
}
