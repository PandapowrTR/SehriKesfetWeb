import { Component, OnInit } from '@angular/core';
import { environments } from '../../../environments/environment';
import { PlacesService } from '../../services/places.service';
declare function loadThemeFromLS(): void;
declare function getTranslate(text: string): string;
declare function getCurrentLang(): string;
declare function getAllTranslates(): [string, any];
declare function setAnimations(): void;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ],
})
export class HomeComponent implements OnInit {
  carouselInterval: any;
  carouselIntervalWork: boolean = true;
  sentence: any;
  placesList: any[] = [];
  randomPlacesList:any = [];
  citiesList: any = [];
  randomCitiesList:any = [];
  obj: any = Object;
  apiUrl:string = "";
  constructor(private placesService: PlacesService) {}
  ngOnInit(): void {
    this.apiUrl = environments.apiURL
    loadThemeFromLS();
    setAnimations();
    setTimeout(() => {
      setAnimations();
    }, 1);
    this.setCarouselInverval();

    this.sentence = this.placesService.getRandomSentence();
    setInterval(() => {
      this.sentence = this.placesService.getRandomSentence();
      this.animateSentence();
    }, 6000);
    this.placesService.getPlaces().subscribe((res) => {
      const file = new File([res], 'data.json');
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result as string);
        Object.entries(json).forEach((value:any) => {
          if (value[1]['type'] == 'city') {
            this.citiesList.push(value[1]);
          }
          this.placesList.push(value[1]);
        });
        this.randomPlacesList = this.getRandomElements(this.shuffle(this.placesList.filter(p=>p["type"] != "city")));
        this.randomCitiesList = this.getRandomElements(this.shuffle(this.placesList.filter(p=>p["type"] == "city")));
      };
      reader.readAsText(file);
    });
  }
  animateSentence() {
    var h1 = <HTMLElement>document.querySelector('.lyric-part h1');
    h1.style.transform = 'translateY(-100%)';
    h1.style.opacity = '0';
    h1.style.filter = 'blur(20px)';
    var q = <HTMLElement>document.querySelector('.lyric-part q');
    if (q) {
      q.style.transform = 'translateY(100%)';
      q.style.opacity = '0';
      q.style.filter = 'blur(20px)';
    }
    h1.animate(
      {
        opacity: '1',
        filter: 'blur(0px)',
        transform: 'translateY(0)',
      },
      {
        duration: 500,
      }
    );
    if (q) {
      q.animate(
        {
          opacity: '1',
          filter: 'blur(0px)',
          transform: 'translateY(0)',
        },
        {
          duration: 500,
        }
      );
    }
    setTimeout(() => {
      h1.style.transform = 'translateY(0)';
      h1.style.opacity = '1';
      h1.style.filter = 'blur(0)';
      if (q) {
        q.style.transform = 'translateY(0)';
        q.style.opacity = '1';
        q.style.filter = 'none';
      }
    }, 500);
  }
  holdCarousel() {
    this.carouselIntervalWork = false;
    clearInterval(this.carouselInterval);
  }
  releaseCarousel() {
    this.setCarouselInverval();
    this.carouselIntervalWork = true;
  }
  setCarouselInverval() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.carouselInterval = setInterval(() => {
      this.carouselMove('next', true);
    }, 6000);
  }
  shuffle<T>(list: T[]): T[] {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }
  getRandomElements<T>(list: T[]): T[] {
    const selectedElements: T[] = [];
    const shuffledList = this.shuffle(list);
    const n = Math.max(Math.floor(Math.random() * shuffledList.length), 2);
    for (let i = 0; i < n; i++) {
      selectedElements.push(shuffledList[i]);
    }

    return selectedElements;
  }
  scrollCities(direction: string) {
    const cities = document.querySelector(
      '.discover-container .cities'
    ) as HTMLElement;
    const scrollWidth = cities.scrollWidth;
    const clientWidth = cities.clientWidth;
    if (direction === 'left') {
      var target =
        cities.scrollLeft - 330 >= 0 ? 330 : scrollWidth - cities.scrollLeft;
      var id = setInterval(() => {
        var m = Math.floor(target / 100);
        cities.scrollLeft -=
          cities.scrollLeft - m < 0
            ? cities.clientWidth - cities.scrollLeft
            : m;
        target -= m;
        if (target <= 0) {
          clearInterval(id);
        }
      }, 1);
    } else if (direction === 'right') {
      var target =
        cities.scrollLeft + 330 <= scrollWidth
          ? 330
          : scrollWidth - cities.scrollLeft;
      var id = setInterval(() => {
        var m = Math.floor(target / 100);
        cities.scrollLeft +=
          cities.scrollLeft + m > cities.clientWidth
            ? cities.clientWidth - cities.scrollLeft
            : m;
        target -= m;
        if (target == 0) {
          clearInterval(id);
        }
      }, 1);
    } else {
      console.error('Invalid scroll direction:', direction);
    }
    cities.scrollLeft = Math.max(
      0,
      Math.min(cities.scrollLeft, scrollWidth - clientWidth)
    );
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
  unfocus(element: HTMLElement) {
    element.blur();
  }
  carouselMove(direction = 'next', interval: boolean = false) {
    if (!interval) {
      document
        .querySelector(
          '.carousel .controls .' + (direction == 'next' ? 'next' : 'previous')
        )
        ?.animate(
          {
            transform:
              'translateX(' + (direction == 'next' ? '20' : '-20') + 'px)',
          },
          {
            duration: 330,
            easing: 'ease-in-out',
          }
        );
    }
    var carouselItems: NodeListOf<HTMLElement> | null =
      document.querySelectorAll('.carousel-items .item');
    var currentElement: HTMLElement | null = document.querySelector(
      '.carousel-items .item.active'
    );
    var nextElement: HTMLElement | null;
    var ind = 0;
    carouselItems.forEach((i) => {
      if (i == currentElement) {
        if (direction == 'next') {
          nextElement =
            carouselItems![ind + 1 < carouselItems!.length ? ind + 1 : 0];
        } else {
          //prevoius
          nextElement =
            carouselItems![ind - 1 >= 0 ? ind - 1 : carouselItems!.length - 1];
        }
      }
      ind++;
    });
    if (nextElement! == currentElement) {
      return;
    }
    if (nextElement! == null && direction == 'next') {
      nextElement = carouselItems[0];
    }
    nextElement!.classList.add('active');
    currentElement?.classList.remove('active');
    if (this.carouselIntervalWork) {
      this.setCarouselInverval();
    } else {
      clearInterval(this.carouselInterval);
    }
  }
}
