import { Component, OnInit } from '@angular/core';
import { AccountService, User } from '../../services/account.service';
import { TranslateService } from '../../services/translate.service';
import { AlertService } from '../../services/alert-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  isLogin: boolean = true;
  constructor(
    public accountService: AccountService,
    public translate: TranslateService,
    private alertService: AlertService
  ) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alertService.showLoading();

    var sessionKey = localStorage.getItem('sessionKey');
    if(!sessionKey){
      alertService.hideLoading();
      return;
    }
    this.accountService
      .login(undefined, undefined, sessionKey ?? '')
      .subscribe((_) => {
        this.alertService.hideLoading();
      });
  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  login(
    sendButton: HTMLButtonElement,
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement
  ) {
    if (!sendButton.disabled) {
      this.setActivityButton(sendButton, false);
      this.alertService.showLoading();
      this.accountService
        .login(emailInput.value, passwordInput.value)
        .subscribe(
          (res: any) => {
            if (res['error'] != undefined) {
              this.alertService.hideLoading();
              this.setActivityButton(sendButton, true);
              this.alertService.addAlert(
                this.translate.getTranslate('Error'),
                this.translate.getTranslate(
                  'There is an Error on Login Prosess. Error:'
                ) +
                  ' ' +
                  res['error'],
                'error'
              );
            }
          },
          (e) => {
            this.alertService.hideLoading();
            this.setActivityButton(sendButton, true);
            this.alertService.addAlert(
              this.translate.getTranslate('Error'),
              this.translate.getTranslate(
                'There is an error on login prosess. Error:'
              ) + e['error'],
              'error'
            );
          },
          () => {
            this.alertService.hideLoading();
            this.setActivityButton(sendButton, true);
          }
        );
    }
  }

  logout() {
    this.alertService.setModal(
      this.translate.getTranslate('Are You Sure') + '?',
      this.translate.getTranslate('SureLogout'),
      true,
      true,
      [
        {
          buttonFunction: () => {
            this.accountService.logout();
            location.reload();
          },
          buttonText: this.translate.getTranslate('Yes'),
          color: 'success',
        },
        {
          buttonFunction: () => {
            this.alertService.removeModal(true);
          },
          buttonText: this.translate.getTranslate('No'),
          color: 'danger',
        },
      ],
      [],
      false
    );
  }

  register(
    sendButton: HTMLButtonElement,
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement
  ) {
    if (!sendButton.disabled) {
      this.setActivityButton(sendButton, false);
      this.alertService.showLoading();
      var passwordAgainInput: HTMLInputElement = document.querySelector(
        '#passwordAgainInput'
      )!;
      if (passwordInput.value != passwordAgainInput.value) {
        this.alertService.addAlert(
          this.translate.getTranslate('Error'),
          this.translate.getTranslate('Passwords do not match'),
          'error',
          3000
        );
        return;
      }
      else if(passwordInput.value.length > 25){
        this.alertService.addAlert(
          this.translate.getTranslate('Error'),
          this.translate.getTranslate('Password length cannot be bigger than 25'),
          'error',
          3000
        );
        return;
      }
      else if(emailInput.value.length > 50){
        this.alertService.addAlert(
          this.translate.getTranslate('Error'),
          this.translate.getTranslate('Email length cannot be bigger than 50'),
          'error',
          3000
        );
        return;
      }
      this.accountService
        .register(emailInput.value, passwordInput.value)
        .subscribe((res) => {
          if (res['error'] == undefined) {
            this.accountService
              .login(emailInput.value, passwordInput.value)
              .subscribe((logRes) => {
                if (logRes['error'] != undefined) {
                  this.alertService.addAlert(
                    this.translate.getTranslate('Error'),
                    this.translate.getTranslate(
                      'There is an Error on Login Prosess. Error:'
                    ) +
                      ' ' +
                      logRes['error'],
                    'error'
                  );
                }

                this.alertService.hideLoading();
              });
          } else {
            this.alertService.addAlert(
              this.translate.getTranslate('Error'),
              this.translate.getTranslate(
                'There is an Error on Register Prosess. Error:'
              )+this.translate.getTranslate(res["error"]),"error"
            );
            this.alertService.hideLoading();
          }
        });
    }
  }
  resetPassword() {
    this.alertService.setModal(
      this.translate.getTranslate('Are You Sure') + '?',
      this.translate.getTranslate('resetPasswordInfo'),
      false,
      true,
      [
        {
          buttonFunction: (inputs: HTMLInputElement[]) => {
            this.alertService.showLoading();
            var email, password, newPassword, newPasswordAgain;
            for (const i of inputs) {
              if (i.name == 'email') {
                email = i.value;
              } else if (i.name == 'password') {
                password = i.value;
              } else if (i.name == 'npassword') {
                newPassword = i.value;
              } else if (i.name == 'npasswordagain') {
                newPasswordAgain = i.value;
              }
            }
            if (newPassword != newPasswordAgain || newPassword?.trim() == '') {
              this.alertService.addAlert(
                this.translate.getTranslate('Error'),
                this.translate.getTranslate('Password(s) are not valid'),
                'error',
                2000
              );
              this.alertService.hideLoading();
              return;
            }
            this.accountService
              .resetPassword(email ?? '', password ?? '', newPassword ?? '')
              .subscribe((res: any) => {
                if (res['error'] == undefined) {
                  localStorage.removeItem('sessionKey');
                  this.accountService.user = undefined;
                  location.reload();
                } else {
                  this.alertService.addAlert(
                    this.translate.getTranslate('Error'),
                    this.translate.getTranslate('passwordResetError') +
                      res['error'],
                    'error',
                    2000
                  );
                }
                this.alertService.hideLoading();
              });
          },
          buttonText: this.translate.getTranslate('Yes'),
          color: 'success',
        },
        {
          buttonFunction: () => {
            this.alertService.removeModal();
          },
          buttonText: this.translate.getTranslate('No'),
          color: 'danger',
        },
      ],
      [
        {
          type: 'text',
          placeHolder: this.translate.getTranslate('Email'),
          name: 'email',
        },
        {
          type: 'password',
          placeHolder: this.translate.getTranslate('Password'),
          name: 'password',
        },
        {
          type: 'password',
          placeHolder: this.translate.getTranslate('New Password'),
          name: 'npassword',
        },
        {
          type: 'password',
          placeHolder: this.translate.getTranslate('New Password (Again)'),
          name: 'npasswordagain',
        },
      ],
      false
    );
  }

  setActivityButton(button: HTMLButtonElement, active: boolean) {
    button.disabled = !active;
    if (active) {
      button.style.backgroundColor = '';
    } else {
      button.style.backgroundColor = 'gray';
    }
  }

  userLogedIn() {
    return typeof this.accountService.user != 'undefined';
  }

  getUserItems() {
    var entries = Object.entries(this.accountService.user!);
    var items = [];
    for (const en of entries) {
      if (!['accountService', 'authority'].includes(en[0])) {
        if (en[0] == 'tokenUpdate') {
          items.push([en[0], this.accountService.user!.tokenUpdateString()]);
          continue;
        }
        items.push(en);
      }
    }
    return items;
  }
  resetSessionKey() {
    this.alertService.setModal(
      this.translate.getTranslate('Are You Sure') + '?',
      this.translate.getTranslate('resetSessionKeyInfo'),
      false,
      true,
      [
        {
          buttonFunction: (inputs: HTMLInputElement[]) => {
            var email, password;
            for (const i of inputs) {
              if (i.name == 'email') {
                email = i.value;
              } else if (i.name == 'password') {
                password = i.value;
              }
            }
            this.accountService
              .resetSessionKey(email ?? '', password ?? '')
              .subscribe((res: any) => {
                if (res['error'] == undefined) {
                  localStorage.removeItem('sessionKey');
                  this.accountService.user = undefined;
                  location.reload();
                } else {
                  this.alertService.addAlert(
                    this.translate.getTranslate('Error'),
                    this.translate.getTranslate('sessionKeyResetError') +
                      res['error'],
                    'error',
                    2000
                  );
                }
              });
          },
          buttonText: this.translate.getTranslate('Yes'),
          color: 'success',
        },
        {
          buttonFunction: () => {
            this.alertService.removeModal();
          },
          buttonText: this.translate.getTranslate('No'),
          color: 'danger',
        },
      ],
      [
        {
          type: 'text',
          placeHolder: this.translate.getTranslate('Email'),
          name: 'email',
        },
        {
          type: 'password',
          placeHolder: this.translate.getTranslate('Password'),
          name: 'password',
        },
      ],
      false
    );
  }

  togglePassword(
    passwordInput: HTMLInputElement,
    toggleButton: HTMLButtonElement
  ) {
    if (passwordInput.type == 'password') {
      passwordInput.type = 'text';
      toggleButton.innerHTML = '<i class="bi bi-eye-fill"></i>';
    } else {
      passwordInput.type = 'password';
      toggleButton.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
    }
  }
  focusInput(input: HTMLInputElement, button?: HTMLButtonElement) {
    input.style.transform = 'scale(1.1)';
    input.style.boxShadow = '-3px 0px 10px black';
    if (button) {
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '3px 0px 10px black';
    }
  }
  blurInput(input: HTMLInputElement, button?: HTMLButtonElement) {
    input.style.transform = '';
    input.style.boxShadow = '';
    if (button) {
      button.style.transform = '';
      button.style.boxShadow = '';
    }
  }
}
