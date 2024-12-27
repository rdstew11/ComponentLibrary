import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

export interface GraphConfig {
    height?: number,
    width?: number;
    xPadding?: number;
    yPadding?: number;
}


@Component({
    selector: 'rds-graph',
    standalone: true,
    imports: [],
    templateUrl: './graph.component.html',
    styleUrl: './graph.component.css'
})
export class RdsGraph implements OnInit, AfterViewInit {
    @Input()
    config!: GraphConfig;

    protected width: number = 900;
    protected height: number = 400;

    private xPadding: number = 20;
    private yPadding: number = 20;

    private canvas!: HTMLCanvasElement | null;
    private ctx!: CanvasRenderingContext2D | null;

    ngOnInit(): void {
        this.configure();
    }

    private configure() {
        if (this.config?.height) { this.height = this.config.height; }
        if (this.config?.width) { this.width = this.config.width; }
        if (this.config?.xPadding) { this.xPadding = this.config.xPadding; }
        if (this.config?.yPadding) { this.yPadding = this.config.yPadding; }
    }


    ngAfterViewInit(): void {
        this.canvas = document.querySelector("canvas");
        if (!this.canvas) {
            throw new Error("Failed to retrieve canvas.");
        }
        if (!this.canvas.getContext) {
            throw new Error("Canvas not supported in current browser.");
        }

        this.ctx = this.canvas.getContext("2d");
        this.render();
    }

    private render() {
        if (this.ctx) {
            this.drawAxes(this.ctx);
            this.drawGrid(this.ctx);
        } else {
            throw new Error("Failed creating Canvas Context.");
        }
    }

    private calcPadding(ctx: CanvasRenderingContext2D): [number, number] {
        const height = ctx.canvas.height;
        const width = ctx.canvas.width;

        const yPad = height / this.yPadding;
        const xPad = width / this.xPadding;
        return [xPad, yPad];
    }

    private drawAxes(ctx: CanvasRenderingContext2D) {
        const height = ctx.canvas.height;
        const width = ctx.canvas.width;

        const [xPad, yPad] = this.calcPadding(ctx);

        const rHeight = height - (2 * yPad);
        const rWidth = width - (2 * xPad);

        ctx.lineWidth = 4;

        ctx.strokeRect(xPad, yPad, rWidth, rHeight);
    }

    private drawGrid(ctx: CanvasRenderingContext2D) {
        const cHeight = ctx.canvas.height;
        const cWidth = ctx.canvas.width;

        const [xPad, yPad] = this.calcPadding(ctx);

        const gHeight = cHeight - (yPad * 2);
        const gWidth = cWidth - (xPad * 2);

        const xSpace = gWidth / 10;
        const ySpace = gHeight / 10;

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;

        let xCurr = xPad + xSpace;
        while (xCurr < gWidth) {
            ctx.moveTo(xCurr, yPad);
            ctx.lineTo(xCurr, cHeight - yPad);
            xCurr += xSpace;
        }

        ctx.stroke();

        // ctx.beginPath();
        // ctx.setLineDash([10, 5]);
        // let yCurr = yPad + ySpace;
        // while (yCurr < gHeight) {
        //     ctx.moveTo(xPad, yCurr);
        //     ctx.lineTo(cWidth - xPad, yCurr);
        //     yCurr += ySpace;
        // }

        // ctx.stroke();


    }

}
