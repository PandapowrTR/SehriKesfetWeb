import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environments } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  talkToArif(messages: any) {
    /*
    messages = [{
      role: 'user' | 'assistant',
      content: message,
    },...]
    */
    return this.http.post(environments.apiURL + 'talkToArif', {
      data: {
        email: this.accountService.user?.email,
        password: this.accountService.user?.password,
        talks: messages,
      },
    });
  }

  letArifPlan(availablePlans: any) {
    return this.http.post(environments.apiURL + 'plan', {
      data: {
        email: this.accountService.user?.email,
        password: this.accountService.user?.password,
        availablePlans: availablePlans,
      },
    });
  }
}
