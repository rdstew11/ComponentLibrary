import { Component, ComponentRef, Directive, Input, TemplateRef, Type, ViewContainerRef } from "@angular/core";
import { DATE_FORMAT } from "../app.constants";
import { CurrencyPipe, DatePipe } from "@angular/common";

interface RdsColOptions {
    type?: Type<RdsCellDef>,
    header?: string,
    key: string;
}



export class RdsColDef {
    type: Type<RdsCellDef>;
    header: string;
    key: string;

    constructor(options: RdsColOptions) {
        this.key = options.key;
        this.header = options.header ? options.header : options.key;
        this.type = options.type ? options.type : RdsTextCell;
    }
}


interface RdsCellInput {
    column: RdsColDef,
    row: any;
}

@Directive({
    standalone: true,
    selector: "[rds-cell]"
})
export class RdsTableCell {

    component!: ComponentRef<RdsCellDef>;

    @Input('rds-cell') set type(input: RdsCellInput) {
        this.component = this.viewRef.createComponent(input.column.type);
        this.component.setInput('data', input.row[input.column.key]);
    }

    constructor(protected templateRef: TemplateRef<any>, protected viewRef: ViewContainerRef) { }
}

@Directive({ standalone: true })
export abstract class RdsCellDef {
    @Input('data') data: any;
}

@Component({
    standalone: true,
    template: "{{data}}"
})
export class RdsTextCell extends RdsCellDef {
}

@Component({
    standalone: true,
    imports: [DatePipe],
    template: "{{data | date: dateFormat}}"
})
export class RdsDateCell extends RdsCellDef {
    dateFormat = DATE_FORMAT;
}

@Component({
    standalone: true,
    imports: [CurrencyPipe],
    template: "<div class='rdsCurrencyCell'>{{data | currency}}</div>",
    styles: '.rdsCurrencyCell {text-align: right;}'
})
export class RdsCurrencyCell extends RdsCellDef {

}
