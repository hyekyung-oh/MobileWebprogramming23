import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit {

  @Input() rating: number = 0.0;  // 초기화 하기!

  constructor() { }

  ngOnInit(): void {
  }

}
