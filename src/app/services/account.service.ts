import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environments } from '../../environments/environment';
import { AlertService } from './alert-service.service';
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  user: User | undefined;
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    public translate: TranslateService
  ) {
    this.loginFromLS();
  }

  login(email?: string, password?: string, sessionKey?: string) {
    var body = {
      data: {},
    };
    if (email && password) {
      body.data = {
        email: email,
        password: password,
      };
    } else {
      body.data = {
        sessionKey: sessionKey,
      };
    }
    return this.http.post(environments.apiURL + '/login', body).pipe(
      map((res: any) => {
        if (!Object.keys(res).includes('error')) {
          res = res['data'];
          this.user = new User(
            res['email'],
            res['password'],
            res['authority'],
            res['tokens'],
            res['maxTokens'],
            res['tokenUpdate'],
            res['nextTokenUpdateDays'],
            res['sessionKey']
          );
          localStorage.setItem('sessionKey', this.user?.sessionKey!);
          return res;
        }
        this.user = undefined;
        return res;
      })
    );
  }

  loginFromLS() {
    var sessionKey = localStorage.getItem('sessionKey');
    if (sessionKey != null) {
      this.login(undefined, undefined, sessionKey!).subscribe(
        (res: any) => {
          if (res['error'] != undefined) {
            this.alertService.addAlert(
              this.translate.getTranslate('Error'),
              this.translate.getTranslate(
                'There is an Error on Login Prosess. Error:'
              ) +
                ' ' +
                res['error'],
              'error'
            );
            this.user = undefined;
            if (res['error'] == 'User Not Found') {
              localStorage.removeItem('sessionKey');
            }
          }
        },
        (e) => {
          this.alertService.addAlert(
            this.translate.getTranslate('Error'),
            this.translate.getTranslate(
              'There is an error on login prosess. Error:'
            ) + e['error'],
            'error'
          );
          this.user = undefined;
        },
        () => {
          this.alertService.hideLoading();
        }
      );
    }
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(environments.apiURL + '/register', {
      data: {
        email: email,
        password: password,
      },
    });
  }

  resetSessionKey(email: string, password: string) {
    return this.http.post(environments.apiURL + '/resetSessionKey', {
      data: {
        email: email,
        password: password,
      },
    });
  }

  resetPassword(email: string, password: string, newPassword: string) {
    return this.http.post(environments.apiURL + '/resetPassword', {
      data: {
        email: email,
        password: password,
        newPassword: newPassword,
      },
    });
  }

  checkAdmin(email: string, password: string): Observable<boolean> {
    return this.http
      .post(environments.apiURL + 'checkAdmin', {
        data: {
          email: email,
          password: password,
        },
      })
      .pipe(
        map((res: any) => {
          if (res['error'] == undefined) {
            if (res['data']) {
              return true;
            }
            return false;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('sessionKey');
    this.user = undefined;
  }

  getTokenCount() {
    return this.http.post(environments.apiURL + 'getTokenCount', {
      data: {
        email: this.user?.email ?? null,
      },
    });
  }
}
export class User {
  email: string;
  password: string;
  authority: string;
  tokens: number;
  maxTokens: number;
  tokenUpdate: Date;
  nextTokenUpdateDays: number;
  sessionKey: string;
  constructor(
    email: string,
    password: string,
    authority: string,
    tokens: number,
    maxTokens: number,
    tokenUpdate: Date,
    nextTokenUpdateDays: number,
    sessionKey: string
  ) {
    this.email = email;
    this.password = password;
    this.authority = authority;
    this.tokens = tokens;
    this.maxTokens = maxTokens;
    this.tokenUpdate = typeof tokenUpdate == "string" ? new Date(tokenUpdate) : tokenUpdate;
    this.nextTokenUpdateDays = nextTokenUpdateDays;
    this.sessionKey = sessionKey;
  }
  tokenUpdateString() {
    try {
      var items: string[] = [
        this.tokenUpdate.getUTCFullYear().toString(),
        (this.tokenUpdate.getUTCMonth() + 1).toString(),
        this.tokenUpdate.getUTCDate().toString(),
        this.tokenUpdate.getUTCHours().toString(),
        this.tokenUpdate.getUTCMinutes().toString(),
        this.tokenUpdate.getUTCSeconds().toString(),
      ];
      for (let i = 0; i < items.length; i++) {
        if (items[i].length == 1) {
          items[i] = '0' + items[i];
        }
      }
      return `${items[2]}-${items[1]}-${items[0]} ${items[3]}:${items[4]}:${items[5]}`;
    } catch (error) {
      return "";
    }
    
  }
}
