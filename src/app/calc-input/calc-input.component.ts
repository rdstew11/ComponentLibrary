import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AmortizationInputData, AmortizationService, Loan } from "../amortization";
import { DownPaymentType } from "../calc.enum";
import { DatePipe } from '@angular/common';


@Component({
    selector: 'calc-input',
    standalone: true,
    imports: [
        FormsModule, DatePipe
    ],
    templateUrl: './calc-input.component.html',
    styleUrl: './calc-input.component.css'
})
export class CalcInputComponent {

    input_data: AmortizationInputData = {
        property_value: 305000,
        down_payment: 16200,
        dp_type: DownPaymentType.PERCENT,
        interest_rate: 7.25,
        monthly_hoa: 535,
        yearly_insurance: 606,
        yearly_tax: 2300,
        start_date: new Date(),
        total_payments: 360
    };

    @Output()
    loanOutput = new EventEmitter<Loan>();

    constructor(private amortization: AmortizationService) { }

    calculateAmortization() {
        if (!this.input_data.start_date?.getDate) {
            this.input_data.start_date = new Date(this.input_data.start_date + 'T00:00');
        }
        console.log(this.input_data.start_date);
        this.loanOutput.emit(this.amortization.calculate_amortization_schedule(this.input_data));
    }
}
