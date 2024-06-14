import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { NavigationEnd, Router } from '@angular/router';
import { environments } from '../../../environments/environment';
declare function loadThemeFromLS(): void;
declare function getTranslate(text: string): string;
declare function getCurrentLang(): string;
declare function getAllTranslates(): [string, any];
declare function setAnimations(): void;

@Component({
  selector: 'app-show-city',
  templateUrl: './show-city.component.html',
  styleUrl: './show-city.component.scss',
})
export class ShowCityComponent implements OnInit {
  constructor(private placesService: PlacesService, private router: Router) {}
  city: any;
  currentCity: any;
  placesList: any;
  images: any[] = [];
  apiUrl: any;
  pageContents: any = [];
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.apiUrl = environments.apiURL;
    this.city = this.router.url.split('cities/');
    this.city = this.city[this.city.length - 1];
    this.city = this.city.split('/')[0];
    this.placesService.getPlaces().subscribe((res) => {
      const file = new File([res], 'data.json');
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result as string);
        this.currentCity = json[this.city.toLowerCase()];
        this.planBoxInterval();
        this.pageContents = this.currentCity['pageContents'];
        this.placesList = [];
        for (const j of Object.entries(json)) {
          if ((j[1] as any)['city'] == this.city.toLowerCase()) {
            this.placesList.push(j);
          }
        }
        for (var p of this.placesList) {
          for (let i = 0; i < p[1]['images'].length; i++) {
            this.images.push(p[1]['images'][i]);
          }
        }
        var patience = 5;
        while (this.images.length < 10) {
          patience -= 1;
          if (patience <= 0) {
            break;
          }
          this.images = this.images.concat(this.shuffle(this.images));
        }
        this.scrollBackground();
      };
      reader.readAsText(file);
    });
    this.autoScroll();
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
  shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  scrollBackground(): void {
    let scrollPosition = 0;
    let scrollRight = true;
    setInterval(() => {
      const background = document.querySelector('.background') as HTMLElement;
      if (background) {
        if (scrollPosition < background.clientWidth * 0.4 && scrollRight) {
          scrollPosition += 1;
        } else if (
          scrollPosition >= background.clientWidth * 0.4 &&
          scrollRight
        ) {
          scrollRight = false;
        }
        if (!scrollRight) {
          scrollPosition -= 1;
        }
        if (
          scrollPosition <= background.clientWidth * 0.4 * -1 &&
          !scrollRight
        ) {
          scrollRight = true;
        }
        background.animate(
          {
            transform: `translateX(${scrollPosition}px)`,
          },
          {
            duration: 500,
          }
        );
        setTimeout(() => {
          background.style.transform = `translateX(${scrollPosition}px)`;
        }, 500);
      }
    }, 30);
  }
  getTranslate(text: string) {
    return getTranslate(text);
  }
  getCurrentLang() {
    return getCurrentLang();
  }
  getAllTranslates() {
    return Object.entries(getAllTranslates());
  }
  focusTo(selector: string) {
    var el = document.querySelector(selector) as HTMLElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  }
  autoScroll() {
    let s = 0;
    let f = true;
    var inf = () => {
      var element = document.querySelector('.auto-scroll') as HTMLElement;
      if (element.scrollHeight - 20 > element.clientHeight) {
        if (s < element.scrollHeight && f) {
          s++;
          f = s < element.scrollHeight;
        } else if (s > 0 && !f) {
          s = 0;
          f = true;
          element.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            i = setInterval(inf, 50);
          }, 2000);
          clearInterval(i);
        }
        element.scrollTo({ top: s, behavior: 'smooth' });
      }
    };
    var i = setInterval(inf, 50);
  }
  planBoxInterval() {
    function setImage(currentCityImages: any) {
      for (let j = 0; j < currentCityImages.length; j++) {
        var activeImage = document.querySelector(
          '.plan-box img.active'
        ) as HTMLImageElement;
        var randomImage;
        while (true) {
          if(currentCityImages.length == 1){
            randomImage = currentCityImages[0]
            break;
          }
          randomImage =
            currentCityImages[
              Math.floor(Math.random() * currentCityImages.length)
            ];
          if (activeImage == null) {
            break;
          }
          if (
            randomImage['imageUrl'] != activeImage.src ||
            randomImage.length == 1
          ) {
            break;
          }
        }
        if(currentCityImages.length == 1){
          break;
        }
        else if (activeImage) {
          activeImage.classList.remove('active');
        }
        var newImage = document.querySelector(
          `.plan-box img[src='${randomImage['imageUrl']}']`
        ) as HTMLElement;
        if (newImage != null) {
          newImage?.classList.add('active');
          newImage.style.transform = 'scale(1.1)';
          newImage.style.opacity = '0';
          newImage?.animate(
            {
              transform: `scale(1)`,
              opacity: '1',
            },
            {
              duration: 300,
            }
          );
          setTimeout(() => {
            newImage.style.transform = 'scale(1)';
            newImage.style.opacity = '1';
          }, 300);
        }
      }
    }
    setImage(this.currentCity['images']);
    setInterval(() => {
      setImage(this.currentCity['images']);
    }, 5000);
  }
}
