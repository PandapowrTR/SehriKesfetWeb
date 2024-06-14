import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePlaceComponent } from './create-place/create-place.component';
import { RouterModule } from '@angular/router';
import { ContinuePlaceComponent } from './continue-place/continue-place.component';

@NgModule({
  declarations: [CreatePlaceComponent, ContinuePlaceComponent],
  imports: [CommonModule, RouterModule],
  exports: [CreatePlaceComponent],
})
export class AdminModule {}
