import { DownPaymentType } from "../calc.enum";

export interface AmortizationInputData {
    property_value: number;
    down_payment: number;
    dp_type: DownPaymentType;
    interest_rate: number;
    monthly_hoa: number;
    yearly_insurance: number;
    yearly_tax: number;
    start_date: Date;
    total_payments: number;
}

export interface PaymentBreakdown {
    interest_amount: number;
    principal_amount: number;
    taxs_and_fees_amount: number;
}

export interface PeriodSnapshot {
    date: Date;
    final_balance: number;
    breakdown: PaymentBreakdown;
}

export interface AmortizationSchedule {
    periods: PeriodSnapshot[];
    total_payments: number;
    start_date: Date;
    end_date?: Date;
}

export interface Loan {
    monthly_payment: number;
    monthly_fees: number;
    interest_rate: number;
    loan_amount: number;
    schedule: AmortizationSchedule;
}
