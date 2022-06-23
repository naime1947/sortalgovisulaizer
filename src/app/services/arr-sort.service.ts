import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArraySortService {
  defaultArrLength = 40;
  speed = 50;

  private arrStore: ArrayModel[] = [];
  private arrSub = new BehaviorSubject<ArrayModel[]>([]);
  public arr$: Observable<ArrayModel[]> = this.arrSub.asObservable();

  constructor() {
    this.generateNewArr();
  }

  setSpeed(value: number) {
    const lowestSpeed = 200;
    this.speed = lowestSpeed - value;
  }

  generateNewArr(length: number = this.defaultArrLength) {
    const newArr = Array.from(
      { length: length * 2 },
      () =>
        ({
          value: Math.floor((Math.random() + 0.01) * 80),
          isSelected: false,
          isSorted: false,
          isDone: false,
        } as ArrayModel)
    );
    this.arrSub.next(newArr);
    this.arrStore = newArr;
  }

  async startBubbleSort(): Promise<boolean> {
    var n = this.arrStore.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        await wait(this.speed);
        this.arrStore[j].isSelected = true;
        this.arrStore[j + 1].isSelected = true;
        this.arrSub.next(this.arrStore);

        if (this.arrStore[j].value > this.arrStore[j + 1].value) {
          await wait(this.speed);

          var temp = this.arrStore[j].value;
          this.arrStore[j].value = this.arrStore[j + 1].value;
          this.arrStore[j + 1].value = temp;

          this.arrStore[j].isSelected = false;
          this.arrStore[j + 1].isSelected = false;
        } else {
          await wait(this.speed);
          this.arrStore[j].isSelected = false;
          this.arrStore[j + 1].isSelected = false;
          this.arrSub.next(this.arrStore);
        }
      }
      await wait(this.speed);
      this.arrStore[n - (i + 1)].isSelected = false;
      this.arrStore[n - (i + 1)].isSorted = true;
      this.arrSub.next(this.arrStore);
    }

    await wait(1000);
    this.arrStore.forEach(async (x) => {
      x.isSelected = false;
      x.isSorted = false;
      x.isDone = true;
    });
    this.arrSub.next(this.arrStore);

    return Promise.resolve(true);
  }
}

export interface ArrayModel {
  value: number;
  isSelected: boolean;
  isSorted: boolean;
  isDone: boolean;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
