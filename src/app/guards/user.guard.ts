import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserGuardService implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}
  canActivate(): boolean | Observable<boolean> | Observable<boolean> {
    var sessionKey = localStorage.getItem('sessionKey');
    if (!sessionKey) {
      this.router.navigate(['/account']);
      return false;
    }
    return this.accountService.login(undefined, undefined, sessionKey ?? '')
    .pipe(
      map((res)=>{
          if(!res || res['error'] != undefined){
              this.router.navigate(["/account"])
              return false;
          }
          return true
      }),
      catchError((_)=>{
          this.router.navigate(["/account"])
          return of(false);
      })
    );
  }
}
