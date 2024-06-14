import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowCityComponent } from './show-city/show-city.component';
import { ShowCityFeatureComponent } from './show-city-feature/show-city-feature.component';
import { PlanMyDayComponent } from './plan-my-day/plan-my-day.component';

const routes: Routes = [
  { path: 'cities/:cityName/plan-my-day', component: PlanMyDayComponent },
  {
    path: 'cities/:cityName/:cityFeature/plan-my-day',
    component: PlanMyDayComponent,
  },
  { path: 'cities/:cityName', component: ShowCityComponent },
  {
    path: 'cities/:cityName/:cityFeature',
    component: ShowCityFeatureComponent,
  },
];
@NgModule({
  declarations: [
    ShowCityComponent,
    ShowCityFeatureComponent,
    PlanMyDayComponent,
  ],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class CitiesModule {}
