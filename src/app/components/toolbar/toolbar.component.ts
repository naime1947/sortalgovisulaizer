import {
  ArraySortService,
  ArrayModel,
} from './../../services/arr-sort.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('range') range!: ElementRef;
  @ViewChild('speed') speed!: ElementRef;
  isMergeSortSelected = false;
  isQuickSortSelected = false;
  isHeapSortSelected = false;
  isBubbleSortSelected = true;

  arr!: ArrayModel[];
  arrSub!: Subscription;

  isSortingStarted = false;
  isSortingDone = false;

  constructor(public arrService: ArraySortService) {}

  ngOnInit(): void {
    this.arrSub = this.arrService.arr$.subscribe((arr) => (this.arr = arr));
  }

  generateNewArr() {
    const value = this.range.nativeElement.value;
    this.arrService.generateNewArr(value);
  }

  onArrySizeChange(e: any) {
    const value = e.target.value;
    this.arrService.generateNewArr(value);
  }

  onSpeedChange(e: any) {
    const value = e.target.value;
    this.arrService.setSpeed(value);
  }
  makeAllBtnFalse() {
    this.isBubbleSortSelected = false;
    this.isMergeSortSelected = false;
    this.isQuickSortSelected = false;
    this.isHeapSortSelected = false;
  }

  onStartSorting() {
    const speed = this.speed.nativeElement.value;
    this.isSortingStarted = true;

    if (this.isMergeSortSelected) {
      this.arrService.startMergeSort().then((isCompleted) => {
        this.isSortingStarted = false;
        this.isSortingDone = isCompleted;
      });
    } else if (this.isQuickSortSelected) {
      console.log('start quick sorting');
    } else if (this.isHeapSortSelected) {
      console.log('start heap sorting');
    } else if (this.isBubbleSortSelected) {
      this.arrService.startBubbleSort().then((isCompleted) => {
        this.isSortingStarted = false;
        this.isSortingDone = isCompleted;
      });
    }
  }

  ngOnDestroy(): void {
    this.arrSub?.unsubscribe();
  }
}
