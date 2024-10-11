import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcInputComponent } from './calc-input.component';

describe('CalcInputComponent', () => {
  let component: CalcInputComponent;
  let fixture: ComponentFixture<CalcInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
