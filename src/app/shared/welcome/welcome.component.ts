import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare function loadThemeFromLS(): void;
declare function getTranslate(text: string): string;
declare function setCurrentLang(lang: string): void;
declare function getCurrentLang(): string;
declare function getAllTranslates(): [string, any];

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router) {}
  inter: any;
  ngOnInit(): void {
    if (localStorage.getItem('welcome')) {
      this.router.navigate(['/']);
    }
    loadThemeFromLS();
    this.inter = setInterval(() => {
      var k = Object.keys(getAllTranslates());
      while (true) {
        var l = k[Math.floor(Math.random() * k.length)];
        if (l == getCurrentLang()) {
          continue;
        }
        setCurrentLang(l);
        this.animateGreet();
        break;
      }
    }, 7000);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        var maxId = setInterval(() => {}, 10000);
        clearInterval(maxId);
        for (let i = 1; i < +maxId; i++) {
          clearInterval(i);
        }
      }
    });
  }

  animateGreet() {
    var h1 = document.querySelector('.greet-div h1') as HTMLElement;
    var p = document.querySelector('.greet-div p') as HTMLElement;
    h1.style.transform = 'rotateX(-90deg)';
    h1?.animate(
      {
        transform: 'rotateX(0)',
      },
      {
        duration: 500,
        easing: 'ease-in-out',
      }
    );

    p.style.transform = 'rotateX(90deg)';
    p?.animate(
      {
        transform: 'rotateX(0)',
      },
      {
        duration: 500,
        easing: 'ease-in-out',
      }
    );
    setTimeout(() => {
      h1.style.transform = '';
      p.style.transform = '';
    }, 500);
  }

  navigateToMainPage(lang: any) {
    if (this.inter) {
      clearInterval(this.inter);
    }
    setCurrentLang(lang);
    localStorage.setItem('welcome', 'true');
    this.router.navigate(['/']);
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
}
