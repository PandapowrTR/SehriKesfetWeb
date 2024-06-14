import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { HomeComponent } from './shared/home/home.component';
import { CitiesModule } from './cities/cities.module';
import { WebServicesModule } from './webServices/services.module';
import { AccountComponent } from './shared/account/account.component';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { CreatePlaceComponent } from './admin/create-place/create-place.component';
import { AdminGuardService } from './guards/admin.guard';
import { ContinuePlaceComponent } from './admin/continue-place/continue-place.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  {
    path: 'createPlace',
    component: CreatePlaceComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'createPlace',
    component: CreatePlaceComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'createPlace/:place',
    component: ContinuePlaceComponent,
    canActivate: [AdminGuardService],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AdminModule,
    SharedModule,
    CitiesModule,
    WebServicesModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    AdminModule,
    SharedModule,
    CitiesModule,
    WebServicesModule,
  ],
})
export class AppRoutingModule {}
