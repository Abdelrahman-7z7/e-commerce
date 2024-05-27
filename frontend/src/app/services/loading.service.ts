import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<Boolean>(false); 
  constructor() { }

  showLoading(){
    this.isLoadingSubject.next(true);
  }

  hideLoading(){
    this.isLoadingSubject.next(false);
  }

  // to ensure that no body can change it from outside the class (it will only be a read only method)
  get isLoading(){
    return this.isLoadingSubject.asObservable();
  }
}
