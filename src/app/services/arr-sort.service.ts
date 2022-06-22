import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArraySortService {
  defaultArrLength = 60;

  private arrSub = new Subject<number[]>();

  public arr$: Observable<number[]> = this.arrSub.asObservable();

  generateNewArr(length: number = this.defaultArrLength) {
    const newArr = Array.from({ length: length }, () =>
      Math.floor(Math.random() * 60)
    );
    this.arrSub.next(newArr);
  }
}
