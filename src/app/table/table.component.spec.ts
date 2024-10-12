import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcOutputComponent } from './table.component';

describe('CalcOutputComponent', () => {
    let component: CalcOutputComponent;
    let fixture: ComponentFixture<CalcOutputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalcOutputComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CalcOutputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
