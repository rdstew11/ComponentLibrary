import { Component } from '@angular/core';
import { CalcInputComponent } from "../calc-input/calc-input.component";
import { AmortizationSchedule, Loan, PeriodSnapshot } from '../amortization';
import { CalcOutputComponent } from "../calc-output/calc-output.component";

@Component({
    selector: 'calculator',
    standalone: true,
    imports: [CalcInputComponent, CalcOutputComponent],
    templateUrl: './calculator.component.html',
    styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
    periods!: PeriodSnapshot[];

    addLoan(loan: Loan) {
        this.periods = loan.schedule.periods;
    }
}
