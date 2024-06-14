import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuePlaceComponent } from './continue-place.component';

describe('ContinuePlaceComponent', () => {
  let component: ContinuePlaceComponent;
  let fixture: ComponentFixture<ContinuePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContinuePlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContinuePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
