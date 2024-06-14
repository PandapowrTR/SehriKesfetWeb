import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { AccountService } from './account.service';
import { async, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  sentences: any = [
    {
      tr: {
        author: 'Yaşar Kemal',
        sentence:
          "Türkiye'nin her köşesi bir romandır. Her şehrin, her kasabanın, her köyün kendine özgü bir hikayesi vardır. Bu hikayeler, Anadolu'nun zengin kültürünü ve tarihini yansıtır.",
      },
      en: {
        author: 'Yaşar Kemal',
        sentence:
          'Every corner of Turkey is a novel. Each city, town, and village has its own unique story. These stories reflect the rich culture and history of Anatolia.',
      },
    },
    {
      tr: {
        author: 'Orhan Pamuk',
        sentence:
          "İstanbul, dünyanın en güzel şehridir. Tarihi ve kültürü, mimarisi ve doğası ile eşsiz bir atmosfere sahiptir. İstanbul'da her adım başı bir tarih, her köşe başı bir güzellik vardır.",
      },
      en: {
        author: 'Orhan Pamuk',
        sentence:
          'Istanbul is the most beautiful city in the world. With its history, culture, architecture, and nature, it possesses a unique atmosphere. In Istanbul, every step is a piece of history, and every corner holds a beauty.',
      },
    },
    {
      tr: {
        author: 'Aziz Sancar',
        sentence:
          'Türkiye, bilim ve teknolojide büyük atılımlar yapacaktır. Genç ve parlak nüfusuyla Türkiye, gelecekte bilim ve teknolojide önemli bir güç olacaktır.',
      },
      en: {
        author: 'Aziz Sancar',
        sentence:
          'Turkey will make significant strides in science and technology. With its young and bright population, Turkey will be an important force in science and technology in the future.',
      },
    },
    {
      tr: {
        author: '',
        sentence:
          'Türkiye, her mevsim ayrı bir güzellik sunan bir ülkedir. İlkbaharda açan çiçekler, yazın güneşli sahilleri, sonbaharda rengarenk yapraklar ve kışın bembeyaz kar örtüsü ile Türkiye, her mevsim ayrı bir cazibeye sahiptir.',
      },
      en: {
        author: '',
        sentence:
          'Turkey is a country that offers a different beauty in every season. The blooming flowers in spring, sunny beaches in summer, colorful leaves in autumn, and the snowy white blanket in winter give Turkey a unique charm in every season.',
      },
    },
    {
      tr: {
        author: '',
        sentence:
          "Türkiye'nin tarihi ve kültürü tüm dünyayı büyüler. Dünyanın en eski uygarlıklarından birine ev sahipliği yapan Türkiye, tarihi eserleri, müzeleri ve arkeolojik alanlarıyla geçmişe bir pencere açar.",
      },
      en: {
        author: '',
        sentence:
          'The history and culture of Turkey enchant the whole world. Hosting one of the oldest civilizations, Turkey opens a window to the past with its historical monuments, museums, and archaeological sites.',
      },
    },
    {
      tr: {
        author: '',
        sentence:
          "Türkiye'nin insanları misafirperverliğiyle bilinir. Sıcakkanlı ve samimi Türk insanları, misafirlerine her zaman en iyisini sunmaya çalışır. Türkiye'de bir yabancı asla yalnız hissetmez.",
      },
      en: {
        author: '',
        sentence:
          'The people of Turkey are known for their hospitality. The warm and friendly Turkish people always strive to offer the best to their guests. A foreigner never feels alone in Turkey.',
      },
    },
    {
      tr: {
        author: '',
        sentence:
          "Türkiye'nin mutfağı, dünyanın en zengin mutfaklarından biridir. Anadolu'nun farklı yörelerinden gelen lezzetler, Türk mutfağını eşsiz kılar. Kebaplar, pideler, mezeler, tatlılar ve daha birçok lezzet, Türk mutfağının zenginliğini yansıtır.",
      },
      en: {
        author: '',
        sentence:
          "Turkey's cuisine is one of the richest in the world. Flavors from different regions of Anatolia make Turkish cuisine unique. Kebabs, flatbreads, appetizers, desserts, and many more reflect the richness of Turkish cuisine.",
      },
    },
    {
      tr: {
        author: '',
        sentence:
          "Türkiye'nin doğası, eşsiz bir güzelliğe sahiptir. Yeşilin her tonunu barındıran ormanları, masmavi denizi, karlı dağları ve turkuaz gölleri ile Türkiye, doğa severler için bir cennet gibidir.",
      },
      en: {
        author: '',
        sentence:
          "Turkey's nature has unparalleled beauty. With its forests containing every shade of green, azure seas, snowy mountains, and turquoise lakes, Turkey is like a paradise for nature lovers.",
      },
    },
  ];

  places: any = {};
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getSentences() {
    return this.sentences;
  }
  getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * this.sentences.length);
    return this.sentences[randomIndex];
  }
  getPlaces() {
    return this.http.get(environments.apiURL + 'shared/places.json', {
      responseType: 'arraybuffer',
    });
  }
  async savePlace(place: string, placeValues: Map<any, any>) {
    if (this.accountService.user) {
      return this.http.post(environments.apiURL + '/savePlace', {
        data: {
          adminEmail: this.accountService.user.email,
          adminPassword: this.accountService.user.password,
          place: place,
          placeValues: JSON.stringify(placeValues),
        },
      });
    }
    return of({ error: 'User Not Found' });
  }
  createPlace(place: Map<any, any>, placeImage: File) {
    var formdata = new FormData();
    formdata.append('file', placeImage);
    formdata.append(
      'data',
      JSON.stringify({
        ...place,
        ...{
          adminEmail: this.accountService.user!.email,
          adminPassword: this.accountService.user!.password,
        },
      })
    );

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    return fetch(environments.apiURL + '/createPlace', requestOptions);
  }

  loadFile(file: File, saveTo: string) {
    if (this.accountService.user) {
      var formdata = new FormData();
      formdata.append('file', file, file.name);
      formdata.append(
        'data',
        JSON.stringify({
          adminEmail: this.accountService.user.email,
          adminPassword: this.accountService.user.password,
          saveTo: saveTo,
        })
      );

      var requestOptions: any = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      return fetch(environments.apiURL + '/loadFile', requestOptions);
    }
    return null;
  }

  deletePlace(place: string) {
    if (this.accountService.user) {
      return this.http.post(environments.apiURL + '/deletePlace', {
        data: {
          adminEmail: this.accountService.user.email,
          adminPassword: this.accountService.user.password,
          place: place,
        },
      });
    }
    return of({ error: 'User Not Found' });
  }
}
