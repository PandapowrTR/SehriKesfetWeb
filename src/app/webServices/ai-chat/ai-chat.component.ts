import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AiService } from '../../services/ai.service';
import { AlertService } from '../../services/alert-service.service';
import { TranslateService } from '../../services/translate.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss',
})
export class AiChatComponent implements OnInit {
  constructor(
    private aiService: AiService,
    private alertService: AlertService,
    public translate: TranslateService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.alertService.showLoading();

    var sessionKey = localStorage.getItem('sessionKey');
    if(sessionKey){

      this.accountService
        .login(undefined, undefined, sessionKey ?? '')
        .subscribe((_) => {
          this.alertService.hideLoading();
          this.getTokenCount();
        });
    }
    else{
      this.alertService.hideLoading();
      this.router.navigate(['/account']);
      return;
    }
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        var maxId = setInterval(() => {}, 10000);
        clearInterval(maxId);
        for (let i = 1; i < +maxId; i++) {
          clearInterval(i);
        }
      }
    });
    this.randomQuestionInter();
  }
  messages: any = [];
  exampleQuestions = [
    {
      tr: "Burdur'da hangi tarihi yerler bulunur?",
      en: 'What historical places are there in Burdur?',
    },
    {
      tr: "İstanbul'da en çok ziyaret edilen müzeler hangileridir?",
      en: 'Which museums are the most visited in Istanbul?',
    },
    {
      tr: "Antalya'nın en güzel plajı neresidir?",
      en: 'Where is the most beautiful beach in Antalya?',
    },
    {
      tr: "Türkiye'de hangi bölgelerde kış sporları yapılabilir?",
      en: 'In which regions of Turkey can winter sports be done?',
    },
    {
      tr: "Anadolu'nun en eski şehri hangisidir?",
      en: 'Which is the oldest city in Anatolia?',
    },
    {
      tr: "İzmir'de en popüler alışveriş merkezi hangisidir?",
      en: 'What is the most popular shopping mall in Izmir?',
    },
    {
      tr: "Kapadokya'da en çok hangi aktiviteler yapılır?",
      en: 'What activities are most popular in Cappadocia?',
    },
    {
      tr: "Ege Bölgesi'nin en ünlü yemekleri nelerdir?",
      en: 'What are the most famous dishes of the Aegean Region?',
    },
    {
      tr: "Türkiye'deki en büyük göl hangisidir?",
      en: 'Which is the largest lake in Turkey?',
    },
    {
      tr: "Marmaris'te gece hayatı nasıldır?",
      en: 'What is the nightlife like in Marmaris?',
    },
    {
      tr: "Konya'da hangi tarihi eserler bulunur?",
      en: 'What historical monuments are there in Konya?',
    },
    {
      tr: "Karadeniz'de en çok hangi balıklar tüketilir?",
      en: 'Which fish are consumed the most in the Black Sea region?',
    },
    {
      tr: "Türkiye'nin en büyük adası hangisidir?",
      en: 'Which is the largest island of Turkey?',
    },
    {
      tr: "Adana'nın meşhur yemeği nedir?",
      en: 'What is the famous dish of Adana?',
    },
    {
      tr: "Van'da hangi tür peynir ünlüdür?",
      en: 'Which type of cheese is famous in Van?',
    },
  ];
  token: any = {
    tokens: 0,
    maxTokens: 0,
  };

  currentExampleQuestion: any = {};
  textAreaFocus = false;
  sendMessage(textArea: HTMLTextAreaElement) {
    var button = document.querySelector('.send-btn') as HTMLElement;
    if (button) {
      button.blur();
    }
    if (this.token["tokens"] <= 0) {
      this.alertService.addAlert(this.translate.getTranslate("Error"), this.translate.getTranslate("tokensAreOverError"), "error")
      return
    }
    var value = textArea.value;
    this.messages.push({ role: 'user', content: value });
    this.messages.push({
      role: 'assistant',
      content: this.translate.getTranslate('[Arif is thinking]'),
    });
    textArea.value = '';
    this.unfocusTextArea();
    this.aiService.talkToArif(this.messages).subscribe(
      (res: any) => {
        if (res['error']) {
          this.alertService.addAlert(
            this.translate.getTranslate('Error'),
            this.translate.getTranslate('sendMessageError'),
            'error'
          );
          textArea.value = value;
          this.messages.pop();
        } else {
          if (this.messages.length != 0) {
            this.messages.pop();
            this.messages.push(res);
            (
              document.querySelector('.last-message') as HTMLElement
            ).scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
      (e) => {
        this.alertService.addAlert(
          this.translate.getTranslate('Error'),
          this.translate.getTranslate('sendMessageError'),
          'error'
        );
      },
      () => {
        this.getTokenCount();
      }
    );
  }
  clearChat() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    var button = document.querySelector('.send-btn') as HTMLElement;
    if (button) {
      button.blur();
    }
    this.messages = [];
    this.unfocusTextArea();
  }
  expandChat(button: HTMLButtonElement, message: HTMLElement) {
    if (message.classList.contains('reduced')) {
      message.classList.remove('reduced');
      button.innerHTML =
        '<span class="material-symbols-outlined" style="font-size: clamp(15px, 8vw, 60px);">expand_less</span>';
    } else {
      message.classList.add('reduced');
      button.innerHTML =
        '<span class="material-symbols-outlined" style="font-size: clamp(15px, 8vw, 60px);">expand_more</span>';
    }
  }
  textAreaKeyboardInput(textArea: HTMLTextAreaElement, event: KeyboardEvent) {
    if (
      event.key == 'Enter' &&
      !event.shiftKey &&
      /Mobi/.test(navigator.userAgent) == false
    ) {
      textArea.blur();
      this.sendMessage(textArea);
    }
  }
  focusTextArea(text?: string) {
    var textArea = document.querySelector('.user-input') as HTMLTextAreaElement;
    textArea.focus();
    if (text) {
      textArea.value = text;
      textArea.select();
    }
    this.textAreaFocus = true;
    (
      document.querySelector('.text-area-container .placeholder') as HTMLElement
    ).style.display = 'none';
  }
  unfocusTextArea() {
    var textArea = document.querySelector('.user-input') as HTMLTextAreaElement;
    if (textArea.value == '' && this.messages.length == 0) {
      this.textAreaFocus = false;
      (
        document.querySelector(
          '.text-area-container .placeholder'
        ) as HTMLElement
      ).style.display = 'block';
    } else if (this.messages.length == 0) {
      (textArea.querySelector('::placeholder') as HTMLElement).classList.add(
        'show-placeholder'
      );
    }
  }
  randomQuestionInter() {
    var getQ = () => {
      if (!this.textAreaFocus && this.messages.length == 0) {
        this.currentExampleQuestion =
          this.exampleQuestions[
            Math.floor(Math.random() * this.exampleQuestions.length)
          ];
        var placeholder = document.querySelector(
          '.text-area-container .placeholder'
        ) as HTMLParagraphElement;
        placeholder.style.transform = 'translateY(-10px)';
        placeholder.animate(
          {
            transform: 'translateY(0)',
          },
          {
            duration: 500,
          }
        );
        setTimeout(() => {
          placeholder.style.transform = 'none';
        }, 500);
      }
    };
    getQ();
    setInterval(getQ, 10000);
  }
  getTokenCount() {
    this.accountService.getTokenCount().subscribe((res: any) => {
      if (res['error'] == undefined) {
        this.token = res['data'];
        return;
      }
      this.alertService.addAlert(
        this.translate.getTranslate('Error'),
        this.translate.getTranslate('ErrorOnGetTokenC'),
        'error'
      );
    });
  }
}
