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
    const lowestSpeed = 100;
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

  private reseIfAlreadySorted() {
    const isSortingAlreadyDoneOnce = this.arrStore.find((x) => x.isDone);
    if (isSortingAlreadyDoneOnce) {
      this.arrStore.forEach((x) => (x.isDone = false));
      this.arrSub.next(this.arrStore);
    }
  }

  async startBubbleSort(): Promise<boolean> {
    this.reseIfAlreadySorted();

    var n = this.arrStore.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.arrStore[j].isSelected = true;
        this.arrStore[j + 1].isSelected = true;

        await wait(this.speed);
        this.arrSub.next(this.arrStore);

        if (this.arrStore[j].value > this.arrStore[j + 1].value) {
          var temp = this.arrStore[j].value;
          this.arrStore[j].value = this.arrStore[j + 1].value;
          this.arrStore[j + 1].value = temp;

          this.arrStore[j].isSelected = false;
          this.arrStore[j + 1].isSelected = false;
          this.arrSub.next(this.arrStore);
        } else {
          this.arrStore[j].isSelected = false;
          this.arrStore[j + 1].isSelected = false;
          this.arrSub.next(this.arrStore);
        }
      }
      this.arrStore[n - (i + 1)].isSelected = false;
      this.arrStore[n - (i + 1)].isSorted = true;
      this.arrSub.next(this.arrStore);
    }

    this.arrStore.forEach(async (x) => {
      x.isSelected = false;
      x.isSorted = false;
      x.isDone = true;
    });

    await wait(400);
    this.arrSub.next(this.arrStore);

    return Promise.resolve(true);
  }

  async startMergeSort(): Promise<boolean> {
    this.reseIfAlreadySorted();

    this.mergeSort(this.arrStore, 0, this.arrStore.length - 1);
    //after sorting done, mark all as done
    // await this.arrStore.forEach(async (x) => {
    //   x.isSelected = false;
    //   x.isSorted = false;
    //   x.isDone = true;
    // });

    // await wait(this.speed * 2);
    // await this.arrSub.next(this.arrStore);

    return Promise.resolve(true);
  }

  async merge(arr: ArrayModel[], l: number, m: number, r: number) {
    let res = arr.slice(l, r + 1);
    let i1 = l;
    let i2 = m + 1;
    let i = l;

    while (i1 <= m && i2 <= r) {
      await wait(this.speed);
      const v1 = res[i1 - l];
      const v2 = res[i2 - l];
      if (v1.value < v2.value) {
        arr[i] = v1;
        arr[i].isSelected = true;
        // await wait(this.speed);
        // this.arrSub.next(arr);
        i++;
        ++i1;
      } else {
        arr[i] = v2;
        arr[i].isSelected = true;
        // await wait(this.speed);
        // this.arrSub.next(arr);
        i++;
        ++i2;
      }
    }

    while (i1 <= m) arr[i++] = res[i1++ - l];
    while (i2 <= m) arr[i++] = res[i2++ - l];
  }

  // l is for left index and r is
  // right index of the sub-array
  // of arr to be sorted */
  async mergeSort(arr: ArrayModel[], l: number, r: number) {
    if (l === undefined || r === undefined) {
      await this.mergeSort(arr, 0, arr.length - 1);
      return; //returns recursively
    }
    if (l >= r) return;
    let m = Math.floor(l + (r - l) / 2);
    await this.mergeSort(arr, l, m);
    await this.mergeSort(arr, m + 1, r);
    await this.merge(arr, l, m, r);
    await this.arrSub.next(arr);
  }
}

export interface ArrayModel {
  value: number;
  isSelected: boolean;
  isSorted: boolean;
  isDone: boolean;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
