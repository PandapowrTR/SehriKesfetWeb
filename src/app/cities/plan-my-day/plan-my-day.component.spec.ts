import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMyDayComponent } from './plan-my-day.component';

describe('PlanMyDayComponent', () => {
  let component: PlanMyDayComponent;
  let fixture: ComponentFixture<PlanMyDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanMyDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanMyDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
