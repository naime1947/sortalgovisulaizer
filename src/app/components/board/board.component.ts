import { ArraySortService } from './../../services/arr-sort.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  isSorted = false;
  constructor(public arrService: ArraySortService) {}

  ngOnInit(): void {}
}
