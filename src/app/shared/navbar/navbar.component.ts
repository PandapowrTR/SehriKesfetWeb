import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService, User } from '../../services/account.service';
import { AlertService } from '../../services/alert-service.service';
declare function loadThemeFromLS(): void;
declare function toggleTheme(): void;
declare function getTranslate(text: string): string;
declare function setCurrentLang(lang: string): void;
declare function getCurrentLang(): string;
declare function getAllTranslates(): [string, any];
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.scss',
    './navbar.componentDark.scss',
    './navbar.componentLight.scss',
  ],
})
export class NavbarComponent implements OnInit {
  lastLinksWidth: number = 0;
  private user:User | undefined;
  translates:any;
  constructor(private accountService:AccountService, private alertService:AlertService) {}
  ngOnInit(): void {
    loadThemeFromLS();
    this.translates = this.getAllTranslates();
    window.addEventListener('DOMContentLoaded', this.onResize);
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }
  onResize() {
    var element = document.querySelector('#links');
    var width = Math.floor(element!.clientWidth);
    if (width == 0) {
      width = this.lastLinksWidth;
    }
    if (window.innerWidth < width * 5) {
      element?.classList.remove('links');
      element?.classList.add('dropdown-links');
      element?.classList.add('d-none');
      element?.classList.add('d-none');
      document.querySelector('.dropdown-on')?.classList.remove('d-none');
      this.lastLinksWidth = width;
    } else {
      element?.classList.add('links');
      element?.classList.remove('dropdown-links');
      element?.classList.remove('d-none');
      document.querySelector('.dropdown-on')?.classList.add('d-none');
    }
  }
  toggleDropdown(container:boolean = false) {
    this.unfocus();
    var linksCbx = <HTMLInputElement>document.querySelector('#linksCbx');
    var links = <HTMLElement>document.querySelector('#links');
    if (linksCbx.checked && !container) {
      links.classList.remove('d-none');
      document.querySelector('.dropdown-container')?.classList.remove('d-none');
    } else {
      links.animate(
        {
          transform: 'scale(0.9)',
          opacity: 0,
        },
        {
          duration: 200,
          easing: 'ease-in-out',
        }
      );
      setTimeout(() => {
        links.classList.add('d-none');
        document.querySelector('.dropdown-container')?.classList.add('d-none');
      }, 200);
    }
    if(container){
      linksCbx.checked = !linksCbx.checked;
    }
  }
  toggleTheme() {
    var tmp = document.createElement('input');
    tmp.style.position = 'absolute';
    tmp.style.top = '0';
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
    toggleTheme();
  }

  getTranslate(text: string) {
    return getTranslate(text);
  }

  setCurrentLang(lang: string) {
    setCurrentLang(lang);
    this.toggleLangDropdown();
    this.onResize();
  }
  getCurrentLang() {
    return getCurrentLang();
  }
  getAllTranslates() {
    return Object.entries(getAllTranslates());
  }
  toggleLangDropdown() {
    const langDropdown = document.querySelector('.lang-dropdown');
    const dropdownContainer = document.querySelector(
      '.lang-dropdown-container'
    );
    if (langDropdown?.classList.contains('d-none')) {
      langDropdown.classList.remove('d-none');
      dropdownContainer?.classList.remove('d-none');
      return;
    }
    langDropdown!.animate(
      {
        transform: 'scale(0.9)',
        opacity: 0,
      },
      {
        duration: 200,
        easing: 'ease-in-out',
      }
    );
    setTimeout(() => {
      langDropdown?.classList.add('d-none');
    }, 200);
    dropdownContainer?.classList.add('d-none');
  }
  unfocus(){
    (document.activeElement! as HTMLElement).blur();
  }
  userLogedIn() {
    return this.accountService.user != undefined;
  }
  userAdmin(){
    if(this.accountService.user){
      return ["ADMIN", "GRANDADMIN"].includes(this.accountService.user?.authority)
    }
    return false;
  }
  
}
