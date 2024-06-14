import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { Router } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { environments } from '../../../environments/environment';
import { AccountService } from '../../services/account.service';
import { AlertService } from '../../services/alert-service.service';

@Component({
  selector: 'app-continue-place',
  templateUrl: './continue-place.component.html',
  styleUrl: './continue-place.component.scss',
})
export class ContinuePlaceComponent implements OnInit {
  place: string | undefined;
  apiUrl: string = '';
  currentPlace: any;
  currentPlaceBackup: any;
  editLanguage: string = 'tr';
  translates: any;

  // body items
  bodyImageClasses = [
    'left-img',
    'right-img',
    'w-25-lpc',
    'w-40-lpc',
    'w-50-lpc',
    'w-100-lpc',
    'w-25-pc',
    'w-40-pc',
    'w-50-pc',
    'w-100-pc',
    'w-25-mobile',
    'w-40-mobile',
    'w-50-mobile',
    'w-100-mobile',
  ];
  bodyImageListClasses = [
    'image-list-horizontal',
    'image-list-vertical',
    'horizonal-on-mobile',
    'horizontal-on-pc',
    'vertical-on-pc',
  ];
  bodyImageListInWebsiteUrlInput: string = '';
  bodyImageListUrlInput: string = '';

  defaultValues: any = {
    text: {
      type: 'text',
      image: {
        type: '',
        src: '',
        alt: '',
        style: '',
        class: 'left-img w-40-lpc w-50-pc w-100-mobile',
      },
      title: {
        texts: {
          tr: '',
          en: '',
        },
      },
      content: {
        texts: {
          tr: '',
          en: '',
        },
      },
    },
    'image-list': {
      type: 'image-list',
      class: 'image-list-horizontal',
      title: {
        texts: {
          tr: '',
          en: '',
        },
        class: 'poppins-medium',
      },
      content: [
        {
          image: '',
          url: '',
          inWebsiteUrl: '',
          target: '_self',
          titles: {
            tr: '',
            en: '',
          },
        },
      ],
    },
    'plan-my-day': {
      type: 'plan-my-day',
      plans: [
        {
          title: { tr: '', en: '' },
          subtitle: { tr: '', en: '' },
          imageUrl: '',
        },
      ],
    },
    item: {
      start: '',
      head: {
        left: {
          title: {
            texts: {
              tr: '',
              en: '',
            },
            class: 'poppins-medium',
          },
          subtitle: {
            texts: {
              tr: '',
              en: '',
            },
            class: 'roboto-regular',
          },
        },
        center: {},
        right: {
          icon: {
            type: '',
            content: '',
          },
          audios: {
            tr: '',
            en: '',
          },
        },
      },
      body: [],
    },
  };

  // new body item
  newBodyItemDropdown: any = '';
  constructor(
    public translate: TranslateService,
    private router: Router,
    private placesService: PlacesService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {
    this.editLanguage = translate.getCurrentLang();
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

    window.onbeforeunload = (ev) => {
      ev.preventDefault();
      return (ev.returnValue = translate.getTranslate('Are You Sure') + '?');
    };
    var s = this.router.url.split('/');
    if (s.length != 2) {
      this.place = s[s.length - 1];
    }
  }

  ngOnInit(): void {
    this.apiUrl = environments.apiURL;
    this.translates = this.translate.getAllTranslates();
    this.placesService.getPlaces().subscribe((res) => {
      const file = new File([res], 'data.json');
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result as string);
        var places: any = [];
        Object.entries(json).forEach((value: any) => {
          places.push(value[1]);
        });
        if (this.place) {
          this.currentPlace = json[this.place];
          this.currentPlaceBackup = JSON.parse(
            JSON.stringify(json[this.place])
          );
        }
      };
      reader.readAsText(file);
    });
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
  addToClassList(pageContentsInd: number, bodyInd: number, value: string) {
    if (
      this.currentPlace['pageContents'][pageContentsInd]['body'][bodyInd][
        'image'
      ]['class'].includes(value)
    ) {
      this.removeFromClassList(pageContentsInd, bodyInd, value);
      return;
    }
    this.currentPlace['pageContents'][pageContentsInd]['body'][bodyInd][
      'image'
    ]['class'] += value;
  }
  removeFromClassList(pageContentsInd: number, bodyInd: number, value: string) {
    this.currentPlace['pageContents'][pageContentsInd]['body'][bodyInd][
      'image'
    ]['class'] = this.currentPlace['pageContents'][pageContentsInd]['body'][
      bodyInd
    ]['image']['class'].replaceAll(value, '');
  }

  setBodyItemType(ind: number, bind: number, t: string) {
    var value = this.defaultValues[t];
    if (
      t == this.currentPlaceBackup['pageContents'][ind]['body'][bind]['type']
    ) {
      value = this.currentPlaceBackup['pageContents'][ind]['body'][bind];
    }
    this.currentPlace['pageContents'][ind]['body'][bind] = value;
  }

  addToImageClassList(pageContentsInd: number, bodyInd: number, value: string) {
    if (
      this.currentPlace['pageContents'][pageContentsInd]['body'][bodyInd][
        'class'
      ].includes(value)
    ) {
      this.removeFromImageClassList(pageContentsInd, bodyInd, value);
      return;
    }
    this.currentPlace['pageContents'][pageContentsInd]['body'][bodyInd][
      'class'
    ] += value;
  }
  removeFromImageClassList(
    pageContentsInd: number,
    bodyInd: number,
    value: string
  ) {
    this.currentPlace['pageContents'][pageContentsInd]['body'][bodyInd][
      'class'
    ] = this.currentPlace['pageContents'][pageContentsInd]['body'][bodyInd][
      'class'
    ].replaceAll(value, '');
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const colorCode =
      '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    const textColor = luminance > 0.5 ? '#000000' : '#ffffff';

    return 'background-color:' + colorCode + '; color:' + textColor;
  }
  saveCurrentPlace() {
    this.alertService.showLoading();
    this.placesService.savePlace(this.place!, this.currentPlace).then((v) => {
      v.subscribe((res: any) => {
        this.alertService.hideLoading();
        if (res['error'] != undefined) {
          this.alertService.addAlert(
            this.translate.getTranslate('Error'),
            this.translate.getTranslate('ErrorOnSavingPlace'),
            'error'
          );
          return;
        }
        this.alertService.addAlert(
          this.translate.getTranslate('Success'),
          this.translate.getTranslate('SuccessOnSavingPlace'),
          'info'
        );
        return;
      });
    });
  }
  loadFile() {
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.style.display = 'none';
    inputElement.formEnctype = 'multipart/form-data';
    inputElement.type = 'file';
    inputElement.id = 'fileInputLoadFile';
    inputElement.accept = '.mp3, .mp4, .png, .jpeg, .jpg';
    inputElement.addEventListener('change', () => {
      this.alertService.showLoading();
      const file = inputElement.files![0];
      const req = this.placesService.loadFile(
        file,
        this.currentPlace['folder']
      );
      var e = false;
      if (req) {
        req.then((res: Response) => {
          if (!res) {
            e = true;
          }
          if (!e) {
            res.text().then((t: string) => {
              var data = JSON.parse(t);
              if (data['error'] != undefined || data['data'] == undefined) {
                e = true;
              }
              if (!e) {
                data = data['data'];
                this.alertService.hideLoading();
                this.alertService.addAlert(
                  this.translate.getTranslate('Success'),
                  this.translate.getTranslate('SuccessOnLoadingFile'),
                  'info'
                );
                navigator.clipboard.writeText(data);
              }
              if (e) {
                this.alertService.addAlert(
                  this.translate.getTranslate('Error'),
                  this.translate.getTranslate('ErrorOnLoadingFile'),
                  'error'
                );
              }
            });
          }
        });
      }
    });
    inputElement.click();
  }

  addNewBodyItem(ind: number) {
    if (this.newBodyItemDropdown != '') {
      this.currentPlace['pageContents'][ind]['body'].push(
        this.defaultValues[this.newBodyItemDropdown]
      );
    }
  }
  deleteBodyItem(ind: number, bind: number) {
    var target = this.currentPlace['pageContents'][ind]['body'][bind];
    var newBody = [];
    for (const b of this.currentPlace['pageContents'][ind]['body']) {
      if (b != target) {
        newBody.push(b);
      }
    }
    this.currentPlace['pageContents'][ind]['body'] = newBody;
  }
  addNewItem() {
    this.currentPlace['pageContents'].push(this.defaultValues['item']);
  }
  deleteItem(ind: number) {
    var target = this.currentPlace['pageContents'][ind];
    var newContents = [];
    for (const c of this.currentPlace['pageContents']) {
      if (c != target) {
        newContents.push(c);
      }
    }
    this.currentPlace['pageContents'] = newContents;
  }

  deleteCurrentPlace() {
    this.alertService.setModal(
      this.translate.getTranslate('Are You Sure') + '?',
      this.translate.getTranslate('deleteCurrentPlaceSure'),
      true,
      true,
      [
        {
          buttonFunction: () => {
            this.alertService.removeModal();
            this.placesService
              .deletePlace(this.place!)
              .subscribe((res: any) => {
                if (res['error'] != undefined) {
                  this.alertService.addAlert(
                    this.translate.getTranslate('Error'),
                    this.translate.getTranslate('ErrorOnDeletingPlace'),
                    'error'
                  );
                  return;
                }
                this.router.navigate(['/createPlace']);
              });
          },
          buttonText: this.translate.getTranslate('Yes'),
          color: 'danger',
        },
        {
          buttonFunction: () => {
            this.alertService.removeModal();
          },
          buttonText: this.translate.getTranslate('No'),
          color: 'success',
        },
      ],
      [],
      true
    );
  }
}
