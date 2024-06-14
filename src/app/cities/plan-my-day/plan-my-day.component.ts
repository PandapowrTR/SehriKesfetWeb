import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { AlertService } from '../../services/alert-service.service';
import { AiService } from '../../services/ai.service';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-plan-my-day',
  templateUrl: './plan-my-day.component.html',
  styleUrl: './plan-my-day.component.scss',
})
export class PlanMyDayComponent implements OnInit {
  plans: any = [];
  currentCity: any;
  availablePlans: any = [];
  token: any = {
    token: 0,
    maxToken: 0,
  };
  currentPlace: any;
  constructor(
    public translate: TranslateService,
    private alerService: AlertService,
    private aiService: AiService,
    private alertService: AlertService,
    private accountService: AccountService,
    private router: Router,
    private placeService: PlacesService
  ) {
    this.alertService.showLoading();

    var sessionKey = localStorage.getItem('sessionKey');
    if (sessionKey) {
      this.accountService
        .login(undefined, undefined, sessionKey ?? '')
        .subscribe((_) => {
          this.alertService.hideLoading();
          this.getTokenCount();
        });
    } else {
      this.alertService.hideLoading();
      this.router.navigate(['/account']);
      return;
    }
  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.currentCity = this.router.url
      .split('cities/')[1]
      .split('/plan-my-day')[0];
    this.placeService.getPlaces().subscribe((res: any) => {
      const file = new File([res], 'data.json');
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result as string);
        Object.entries(json).forEach((value: any) => {
          if (
            value[1]['link'].split('/cities')[1].split('/')[1] ==
            this.currentCity
          ) {
            this.currentPlace = value[1];
            for (const pc of this.currentPlace['pageContents']) {
              for (const b of pc['body']) {
                if (b['type'] == 'plan-my-day') {
                  this.availablePlans = b['plans'];

                  var localP: any = localStorage.getItem(
                    'plans:' + this.currentCity
                  );
                  if (localP) {
                    localP = JSON.parse(localP);
                    this.plans = localP;
                    if (this.plans.length != 0) {
                      this.plans = this.plans.filter((p: any) => {
                        for (const ap of this.availablePlans) {
                          if (
                            ap['subtitle']['en'] === p['subtitle']['en'] &&
                            ap['title']['en'] === p['title']['en']
                          ) {
                            return true;
                          }
                        }
                        return false;
                      });

                      this.availablePlans = this.availablePlans.filter(
                        (ap: any) => {
                          return !this.plans.some(
                            (p: any) =>
                              p.subtitle.en === ap.subtitle.en &&
                              p.title.en === ap.title.en
                          );
                        }
                      );
                      this.savePlansToLocalStorage();

                      this.alerService.addAlert(
                        this.translate.getTranslate('Info'),
                        this.translate.getTranslate('oldPlansLoaddedInfo'),
                        'info',
                        3000
                      );
                    }
                  }
                  return;
                }
              }
            }
          }
        });
        if (this.currentPlace == undefined) {
          this.alertService.addAlert(
            this.translate.getTranslate('Error'),
            this.translate.getTranslate('errorOnGettingPlace'),
            'error'
          );
          this.router.navigate(['/']);
        }
      };
      reader.readAsText(file);
    });
  }
  renameText(text: HTMLElement, inputContainer: HTMLElement) {
    text.style.display = 'none';
    inputContainer.style.display = 'flex';
  }
  doneRenameText(
    text: HTMLElement,
    input: HTMLInputElement,
    inputContainer: HTMLElement,
    planIndex: number,
    plan: string
  ) {
    text.style.display = 'block';
    inputContainer.style.display = 'none';
    this.plans[planIndex][plan] = input.value;
  }
  cancelRenameText(text: HTMLElement, inputContainer: HTMLElement) {
    text.style.display = 'block';
    inputContainer.style.display = 'none';
  }
  addToPlan(plan: any) {
    this.plans.push(plan);
    this.availablePlans.splice(this.availablePlans.indexOf(plan), 1);
    this.savePlansToLocalStorage();
  }
  removeFromplan(plan: any) {
    this.availablePlans.push(plan);
    this.plans.splice(this.plans.indexOf(plan), 1);
    this.savePlansToLocalStorage();
  }
  movePlan(plan: any, direction: String) {
    var nextIndex;
    if (direction == 'left') {
      nextIndex = this.plans.indexOf(plan) - 1;
      if (nextIndex < 0) {
        nextIndex = this.plans.length - 1;
      }
    } else {
      nextIndex = this.plans.indexOf(plan) + 1;
      if (nextIndex >= this.plans.length) {
        nextIndex = 0;
      }
    }
    this.plans = this.swapArrayElements(
      this.plans,
      this.plans.indexOf(plan),
      nextIndex
    );
    this.savePlansToLocalStorage();
  }
  swapArrayElements(arr: any[], index1: number, index2: number) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
  }
  letAIPlan() {
    this.alerService.showLoading();
    var plans = this.plans.concat(this.availablePlans);
    this.aiService.letArifPlan(plans).subscribe(
      (res: any) => {
        if (res['error']) {
          this.alerService.addAlert(
            this.translate.getTranslate('Error'),
            this.translate.getTranslate('errorOnPlanAI'),
            'error'
          );
          this.alerService.hideLoading();
          return;
        }
        this.plans = res;
        for (let i = 0; i < res.length; i++) {
          plans.splice(this.availablePlans.indexOf(res[i]), 1);
        }
        this.availablePlans = plans;

        this.savePlansToLocalStorage();
        this.alerService.hideLoading();
      },
      () => {
        this.alerService.addAlert(
          this.translate.getTranslate('Error'),
          this.translate.getTranslate('errorOnPlanAI'),
          'error'
        );
        this.alerService.hideLoading();
      },
      () => {
        this.getTokenCount();
      }
    );
  }
  savePlansToLocalStorage() {
    localStorage.setItem(
      'plans:' + this.currentCity,
      JSON.stringify(this.plans)
    );
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
