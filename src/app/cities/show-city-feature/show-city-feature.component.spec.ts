import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCityFeatureComponent } from './show-city-feature.component';

describe('ShowCityFeatureComponent', () => {
  let component: ShowCityFeatureComponent;
  let fixture: ComponentFixture<ShowCityFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCityFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowCityFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
