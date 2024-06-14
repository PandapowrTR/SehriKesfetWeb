import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { Router } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { environments } from '../../../environments/environment';
import { AccountService } from '../../services/account.service';
import { AlertService } from '../../services/alert-service.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrl: './create-place.component.scss',
})
export class CreatePlaceComponent implements OnInit {
  // No Place
  placeItems = [
    {
      value: 'city',
      content: 'City',
    },
    {
      value: 'city-area',
      content: 'City Area',
    },
  ];
  place: string = this.placeItems[0]['value'];
  apiUrl: string = '';
  allPlaces: any = [];
  parentPlaces: any = [];
  newPlace: any = {
    placeNames: {
      tr: '',
      en: '',
    },
    placeImageInfo: {
      photographerLink: '',
      photographerName: '',
      titles: {
        tr: '',
        en: '',
      },
      texts: {
        tr: '',
        en: '',
      },
    },
    placeTexts: {
      tr: '',
      en: '',
    },
    placeType: 'city',
    parentCityName: null,
  };
  showParentCityName = '';
  placeImageFile: File | undefined;

  asynclogin() {}
  constructor(
    public translate: TranslateService,
    private router: Router,
    private placesService: PlacesService,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    alertService.showLoading();

    var sessionKey = localStorage.getItem('sessionKey');
    if (sessionKey) {
      this.accountService
        .login(undefined, undefined, sessionKey ?? '')
        .subscribe((_) => {
          accountService
            .checkAdmin(
              accountService.user?.email ?? '',
              accountService.user?.password ?? ''
            )
            .subscribe((res) => {
              alertService.hideLoading();
              if (!res) {
                this.router.navigate(['/account']);
              }
            });
        });
    } else {
      this.alertService.hideLoading();
      this.router.navigate(['/account']);
      return;
    }

    var s = this.router.url.split('/');
    if (s.length != 2) {
      this.place = s[s.length - 1];
    }
  }
  ngOnInit(): void {
    this.apiUrl = environments.apiURL;
    this.placesService.getPlaces().subscribe((res) => {
      const file = new File([res], 'data.json');
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result as string);
        var places: any = [];
        Object.entries(json).forEach((value: any) => {
          places.push([value[0], value[1]]);
        });
        this.allPlaces = places;
        for (const p of this.allPlaces) {
          if (p[1]['type'] == 'city') {
            this.parentPlaces.push(p);
          }
        }
        this.newPlace['parentCityName'] = this.parentPlaces[0][0];
        this.showParentCityName =
          this.parentPlaces[0][1]['names'][this.translate.getCurrentLang()];
      };
      reader.readAsText(file);
    });
  }
  toggleSelections(
    newOneContainer: HTMLElement,
    createNewOneBtn: HTMLElement,
    continueContainer: HTMLElement,
    continueBtn: HTMLElement,
    clicked: string = 'new'
  ) {
    if (
      !newOneContainer.classList.contains('d-none') &&
      !continueContainer.classList.contains('d-none')
    ) {
      if (clicked == 'new') {
        continueBtn.click();
      } else {
        createNewOneBtn.click();
      }
    }
  }
  toggleDropdown(toggleButton: HTMLButtonElement, dropdownItems: HTMLElement) {
    if (dropdownItems.classList.contains('d-none')) {
      dropdownItems.classList.remove('d-none');
      toggleButton.querySelector('i')?.classList.remove('bi-arrow-down-short');
      toggleButton.querySelector('i')?.classList.add('bi-arrow-up-short');
      return;
    }
    dropdownItems.classList.add('d-none');
    toggleButton.querySelector('i')?.classList.remove('bi-arrow-up-short');
    toggleButton.querySelector('i')?.classList.add('bi-arrow-down-short');
  }

  canCreateNewPlace() {
    if (this.placeImageFile == undefined) {
      return false;
    }
    for (const l of this.translate.getAllLanguages()) {
      if (
        this.newPlace['placeNames'][l].trim() == '' ||
        this.newPlace['placeTexts'][l].trim() == ''
      ) {
        return false;
      }
      for (const k of ['titles', 'texts']) {
        if (this.newPlace['placeImageInfo'][k][l].trim() == '') {
          return false;
        }
      }
    }
    for (const k of ['photographerLink', 'photographerName']) {
      if (this.newPlace['placeImageInfo'][k].trim() == '') {
        return false;
      }
    }
    if (
      this.newPlace['placeType'] == 'city-area' &&
      this.newPlace['parentCityName'] == null
    ) {
      return false;
    }
    return true;
  }
  createNewPlace() {
    if (!this.canCreateNewPlace()) {
      this.alertService.addAlert(
        this.translate.getTranslate('Error'),
        this.translate.getTranslate('CreatePlaceError'),
        'error',
        5000
      );
      return;
    }
    var error = false;
    this.alertService.showLoading();
    this.placesService
      .createPlace(this.newPlace, this.placeImageFile!)
      .then((res: Response) => {
        if (!res) {
          error = true;
        }
        res.text().then((t) => {
          var data = JSON.parse(t);
          if (data['error'] != undefined || data['data'] == undefined) {
            error = true;
          }
          if (!error) {
            this.alertService.addAlert(
              this.translate.getTranslate('Success'),
              this.translate.getTranslate('SuccessOnCretingPlace'),
              'info',
              5000
            );
            data = JSON.parse(data['data']);
            this.router.navigate([data['link']]);
          } else {
            this.alertService.addAlert(
              this.translate.getTranslate('Error'),
              this.translate.getTranslate('CreatePlaceError'),
              'error'
            );
          }
          this.alertService.hideLoading();
        });
      });
  }
}
