import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { TranslateService } from '../../services/translate.service';
import { environments } from '../../../environments/environment';

@Component({
  selector: 'app-show-city-feature',
  templateUrl: './show-city-feature.component.html',
  styleUrls: [
    './show-city-feature.component.scss',
    '../show-city/show-city.component.scss',
  ],
})
export class ShowCityFeatureComponent implements OnInit {
  placesList: any;
  images: any[] = [];
  apiUrl: any;
  city: any;
  currentCity: any;
  pageContents: any = [];
  constructor(
    private placesService: PlacesService,
    private router: Router,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.apiUrl = environments.apiURL;
    this.city = this.router.url.split('cities/');
    this.city = this.city[this.city.length - 1];
    this.planBoxInterval();
    this.placesService.getPlaces().subscribe((res) => {
      const file = new File([res], 'data.json');
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result as string);
        this.currentCity =
          json[
            this.city
              .split('/')
              [this.city.split('/').length - 1].toLowerCase()
              .replaceAll('-', '_')
          ];
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
      };
      reader.readAsText(file);
    });
    this.planBoxInterval();
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
  planBoxInterval() {
    function setImage(pageContents: any) {
      for (let j = 0; j < pageContents.length; j++) {
        const c = pageContents[j];
        var planMyDay = c['body'].filter(
          (i: any) => i['type'] == 'plan-my-day'
        )[0];
        var activeImage = document.querySelector(
          '.plan-box img.active'
        ) as HTMLImageElement;
        if (activeImage) {
          activeImage.classList.remove('active');
        }
        var randomImage;
        while (true) {
          randomImage =
            planMyDay['planBoxImages'][
              Math.floor(Math.random() * planMyDay['planBoxImages'].length)
            ];
          if (activeImage == null) {
            break;
          }
          if (
            randomImage['url'] != activeImage.src ||
            randomImage.length == 1
          ) {
            break;
          }
        }
        var newImage = document.querySelector(
          `.plan-box img[src='${randomImage['url']}']`
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
    setImage(this.pageContents);
    setInterval(() => {
      setImage(this.pageContents);
    }, 5000);
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
}
