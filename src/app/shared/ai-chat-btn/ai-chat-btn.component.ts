import { Component, OnInit } from '@angular/core';
declare function loadThemeFromLS(): void;
declare function setAnimations(): void;

@Component({
  selector: 'app-ai-chat-btn',
  templateUrl: './ai-chat-btn.component.html',
  styleUrl: './ai-chat-btn.component.scss',
})
export class AiChatBtnComponent implements OnInit {
  ngOnInit(): void {
    loadThemeFromLS();
    setAnimations();
  }
}
