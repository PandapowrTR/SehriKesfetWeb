import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiChatBtnComponent } from './ai-chat-btn.component';

describe('AiChatBtnComponent', () => {
  let component: AiChatBtnComponent;
  let fixture: ComponentFixture<AiChatBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiChatBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiChatBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
