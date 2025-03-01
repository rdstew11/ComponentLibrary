import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RdsDataSource } from '../table/data-source';

export interface GraphConfig {
    height?: number,
    width?: number;
    xPadding?: number;
    yPadding?: number;
}

interface GraphConstants {
    cHeight: number,
    cWidth: number,
    xPad: number,
    yPad: number,
    gHeight: number,
    gWidth: number,
    xScale: number,
    yScale: number;
}


@Component({
    selector: 'rds-graph',
    standalone: true,
    imports: [],
    templateUrl: './graph.component.html',
    styleUrl: './graph.component.css'
})
export class RdsGraph implements OnInit, AfterViewInit, OnChanges {
    @Input()
    config!: GraphConfig;

    @Input()
    data!: number[];

    protected width: number = 600;
    protected height: number = 200;

    private xPadding: number = 20;
    private yPadding: number = 20;

    private canvas!: HTMLCanvasElement | null;
    private ctx!: CanvasRenderingContext2D | null;

    ngOnInit(): void {
        this.configure();
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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.data = changes['data'].currentValue;
            console.log(this.data);
            this.render();
        }
    }

    private convertCoordinates(cfg: GraphConstants, x: number, y: number): [number, number] {
        x = (x * cfg.xScale) + cfg.xPad;
        y = cfg.cHeight - ((y * cfg.yScale) + cfg.yPad);

        return [x, y];
    }

    private configure() {
        if (this.config?.height) { this.height = this.config.height; }
        if (this.config?.width) { this.width = this.config.width; }
        if (this.config?.xPadding) { this.xPadding = this.config.xPadding; }
        if (this.config?.yPadding) { this.yPadding = this.config.yPadding; }
    }


    private calcPadding(ctx: CanvasRenderingContext2D): [number, number] {
        const height = ctx.canvas.height;
        const width = ctx.canvas.width;

        const yPad = height / this.yPadding;
        const xPad = width / this.xPadding;
        return [xPad, yPad];
    }

    private calcConstants(ctx: CanvasRenderingContext2D, data: number[]): GraphConstants {
        const cHeight = ctx.canvas.height;
        const cWidth = ctx.canvas.width;

        const [xPad, yPad] = this.calcPadding(ctx);

        const gHeight = cHeight - (yPad * 2);
        const gWidth = cWidth - (xPad * 2);

        let yMax = 1;
        let yMin = -1;

        for (let i = 0; i < data.length; i++) {
            const val = data[i];

            if (val > yMax) {
                yMax = val;
            }

            if (val < yMin) {
                yMin = val;
            }
        }

        const yScale = (gHeight * 0.9) / yMax;
        const xScale = gWidth / (data.length);

        return {
            cHeight: cHeight,
            cWidth: cWidth,
            xPad: xPad,
            yPad: yPad,
            gHeight: gHeight,
            gWidth: gWidth,
            xScale: xScale,
            yScale: yScale
        };
    }

    private render() {
        if (this.ctx) {
            const cfg = this.calcConstants(this.ctx, this.data);
            console.log(cfg);
            this.clearCanvas(this.ctx);
            this.drawAxes(this.ctx);
            // this.drawGrid(this.ctx, cfg);
            this.drawData(this.ctx, cfg, this.data);
        } else {
            throw new Error("Failed creating Canvas Context.");
        }
    }

    private clearCanvas(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    private drawAxes(ctx: CanvasRenderingContext2D) {
        const height = ctx.canvas.height;
        const width = ctx.canvas.width;

        const [xPad, yPad] = this.calcPadding(ctx);

        const rHeight = height - (2 * yPad);
        const rWidth = width - (2 * xPad);

        ctx.lineWidth = 2;

        ctx.strokeRect(xPad, yPad, rWidth, rHeight);
    }



    private drawGrid(ctx: CanvasRenderingContext2D, cfg: GraphConstants) {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;

        let xCurr = cfg.xPad + cfg.xScale;
        while (xCurr < cfg.gWidth) {
            ctx.moveTo(xCurr, cfg.yPad);
            ctx.lineTo(xCurr, cfg.cHeight - cfg.yPad);
            xCurr += cfg.xScale;
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

    private drawData(ctx: CanvasRenderingContext2D, cfg: GraphConstants, data: number[]) {
        if (!data) {
            throw new Error("No Data Provided");
        }
        let xLoc = 0;
        let idx = 0;
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;

        while (idx < data.length - 1) {

            const loc1 = this.convertCoordinates(cfg, idx, data[idx]);
            const loc2 = this.convertCoordinates(cfg, idx + 1, data[idx + 1]);

            ctx.moveTo(loc1[0], loc1[1]);
            ctx.lineTo(loc2[0], loc2[1]);
            xLoc = xLoc + cfg.xScale;
            idx++;
        }

        ctx.stroke();
    }

}
