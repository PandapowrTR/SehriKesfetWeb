import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiChatComponent } from './ai-chat/ai-chat.component';
import { RouterModule, Routes } from '@angular/router';
import { UserGuardService } from '../guards/user.guard';

const routes: Routes = [
  { path: 'arif', component: AiChatComponent, canActivate: [UserGuardService] },
];
@NgModule({
  declarations: [AiChatComponent],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  providers: [UserGuardService],
  exports: [AiChatComponent],
})
export class WebServicesModule {}
