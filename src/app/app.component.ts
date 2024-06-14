import { Component, OnInit } from '@angular/core';
import { AlertService } from './services/alert-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from './services/account.service';
declare function loadThemeFromLS(): void;
declare function getTranslate(text: string): string;
declare function setCurrentLang(lang: string): void;
declare function getCurrentLang(): string;
declare function getAllTranslates(): [string, any];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'sehriKesfet';
  showChatBtn = true;
  constructor(private alertService: AlertService, private router: Router, private accountService:AccountService) {
    if(!localStorage.getItem("welcome")){
      router.navigate(["/welcome"])
    }
  }
  getAlerts() {
    return this.alertService.getAlerts();
  }
  getModal() {
    return this.alertService.getModal();
  }
  removeModal(animate: boolean = false) {
    this.alertService.removeModal(animate);
  }
  ngOnInit(): void {
    loadThemeFromLS();
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        var url = ev.url.split("/")[1]
        this.showChatBtn = !['arif', 'createPlace'].includes(url);
      }
    });
  }
  getTranslate(text: string) {
    return getTranslate(text);
  }

  setCurrentLang(lang: string) {
    setCurrentLang(lang);
  }
  getCurrentLang() {
    return getCurrentLang();
  }
  getAllTranslates() {
    return Object.entries(getAllTranslates());
  }
  removeElement(element: HTMLElement) {
    element!.animate(
      {
        opacity: 0,
      },
      {
        duration: 500,
        easing: 'ease-in-out',
      }
    );
    setTimeout(() => {
      element!.remove();
    }, 500);
    this.alertService.removeAlert(+element.id);
  }
  getModalInputs(){
    return this.alertService.getModalInputs()
  }
}
