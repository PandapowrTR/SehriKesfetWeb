import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: any[] = [];
  modal: any;
  addAlert(title = 'Title', content = 'Text', type = 'info', lifeTime = 3000) {
    if (this.alerts.length + 1 > 3) {
      this.alerts.shift();
    }
    this.alerts.push({ title: title, content: content, type: type });
    const currentInd = this.alerts.length - 1;
    if (lifeTime != -1) {
      setTimeout(() => {
        this.alerts.splice(currentInd, 1);
      }, lifeTime);
    }
  }
  removeAlert(index: number) {
    this.alerts.splice(index, 1);
  }
  getAlerts() {
    return this.alerts.reverse();
  }

  setModal(
    title: string,
    content: string,
    dissmissable: boolean,
    closeBtn: boolean,
    actions: modalAction[],
    inputs:modalInput[],
    canNavbar: boolean
  ) {
    this.modal = {
      title: title,
      content: content,
      dissmissable: dissmissable,
      closeBtn: closeBtn,
      actions: actions,
      inputs:inputs,
      canNavbar: canNavbar,
    };
    document.querySelector('.app-component-modal')?.classList.remove('d-none');
    this.closeScrolling();
  }
  removeModal(animate: boolean = false) {
    if (animate) {
      var modal = document.querySelector('.app-component-modal .modal');
      modal?.animate(
        {
          opacity: '0',
          transform: 'translateY(-100px)',
        },
        {
          duration: 500,
        }
      );
      setTimeout(() => {
        this.modal = undefined;
        document.querySelector('.app-component-modal')?.classList.add('d-none');
      }, 500);
    } else {
      this.modal = undefined;
      document.querySelector('.app-component-modal')?.classList.add('d-none');
    }
    this.openScrolling();
  }
  getModal() {
    return this.modal;
  }
  showLoading() {
    this.closeScrolling();
    var loadingContainer = document.querySelector('.loading-container');
    loadingContainer!.classList.remove('d-none');
  }
  hideLoading() {
    this.openScrolling();
    var loadingContainer = document.querySelector('.loading-container');
    loadingContainer!.classList.add('d-none');
  }
  closeScrolling() {
    document.body.style.overflow = 'hidden';
  }
  openScrolling() {
    document.body.style.overflow = 'auto';
  }
  getModalInputs(){
    return document.querySelectorAll(".modal-inputs")
  }
}

export interface modalAction {
  buttonText: string;
  color: string;
  buttonFunction: any;
}
export interface modalInput{
  type:string,
  placeHolder:string,
  name:string
}