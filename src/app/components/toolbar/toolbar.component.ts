import { ArraySortService } from './../../services/arr-sort.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private arrService: ArraySortService) {}

  ngOnInit(): void {}

  generateNewArr() {
    this.arrService.generateNewArr();
  }

  onRangeChange(e: any) {
    const value = e.target.value;
    this.arrService.generateNewArr(value);
  }
}
