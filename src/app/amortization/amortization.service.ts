import { Injectable } from '@angular/core';
import { AmortizationInputData, AmortizationSchedule, PeriodSnapshot, Loan } from "./amortization.interface";

@Injectable({
    providedIn: 'root'
})
export class AmortizationService {

    constructor() { }

    private initialize_loan(data: AmortizationInputData): Loan {
        let interest_rate = data.interest_rate / (100 * 12);
        let loan_amount = (data.property_value - data.down_payment);
        let exponential_amount = (1 + interest_rate) ** data.total_payments;
        let monthly_payment = loan_amount * ((interest_rate * exponential_amount) / (exponential_amount - 1));


        return {
            monthly_payment: monthly_payment,
            monthly_fees: data.monthly_hoa + data.yearly_insurance / 12 + data.yearly_tax / 12,
            interest_rate: interest_rate,
            loan_amount: loan_amount,
            schedule: {
                periods: [],
                total_payments: data.total_payments,
                start_date: data.start_date
            }
        };
    }

    calculate_amortization_schedule(data: AmortizationInputData): Loan {
        let loan = this.initialize_loan(data);

        let balance = loan.loan_amount;

        for (let i = 0; i < loan.schedule.total_payments; i++) {
            let interest_amount = balance * loan.interest_rate;
            let principal_amount = loan.monthly_payment - interest_amount;
            balance -= principal_amount;

            let snapshot_date = new Date();

            let snapshot: PeriodSnapshot = {
                date: new Date(snapshot_date.setMonth(loan.schedule.start_date.getMonth() + i)),
                final_balance: balance,
                interest_amount: interest_amount,
                principal_amount: principal_amount,
                fees_amount: loan.monthly_fees
            };

            loan.schedule.periods.push(snapshot);
        }


        return loan;
    }



}
