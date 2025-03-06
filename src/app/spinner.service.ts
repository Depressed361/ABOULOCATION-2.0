import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  private spinner = new BehaviorSubject<boolean>(false);
  spinner$ = this.spinner.asObservable();

  showSpinner() {
    this.spinner.next(true);
  }

  hideSpinner() {
    this.spinner.next(false);
  }
}
