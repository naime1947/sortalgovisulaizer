import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArraySortService {
  defaultArrLength = 60;
  private arrSub = new BehaviorSubject<number[]>([]);
  public arr$: Observable<number[]> = this.arrSub.asObservable();

  constructor() {
    this.generateNewArr();
  }

  generateNewArr(length: number = this.defaultArrLength) {
    const newArr = Array.from({ length: length }, () =>
      Math.floor((Math.random() + 0.01) * 60)
    );
    this.arrSub.next(newArr);
  }
}
