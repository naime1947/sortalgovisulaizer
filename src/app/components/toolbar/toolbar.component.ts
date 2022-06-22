import { ArraySortService } from './../../services/arr-sort.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @ViewChild('range') range!: ElementRef;
  @ViewChild('speed') speed!: ElementRef;

  constructor(public arrService: ArraySortService) {}

  ngOnInit(): void {}

  generateNewArr() {
    const value = this.range.nativeElement.value;
    this.arrService.generateNewArr(value);
  }

  onRangeChange(e: any) {
    const value = e.target.value;
    this.arrService.generateNewArr(value);
  }

  onSpeedChange(e: any){
    const value = e.target.value;
  }
}
