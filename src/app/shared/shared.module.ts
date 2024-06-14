import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AiChatBtnComponent } from './ai-chat-btn/ai-chat-btn.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    NavbarComponent,
    WelcomeComponent,
    HomeComponent,
    AiChatBtnComponent,
    AccountComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavbarComponent,
    WelcomeComponent,
    HomeComponent,
    AiChatBtnComponent,
  ],
})
export class SharedModule {}
