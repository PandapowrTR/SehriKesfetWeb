import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCityComponent } from './show-city.component';

describe('ShowCityComponent', () => {
  let component: ShowCityComponent;
  let fixture: ComponentFixture<ShowCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
