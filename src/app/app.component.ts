import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalcInputComponent } from "./calc-input/calc-input.component";
import { CalculatorComponent } from "./calculator/calculator.component";
import { Table } from './table/table.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CalculatorComponent, Table],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'FinanceApp';
}
