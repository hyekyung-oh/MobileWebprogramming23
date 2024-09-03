import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../home-list/home-list.component';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() location!: Location; //  !를 사용하면 TypeScript에게 "나중에 반드시 값이 할당될 것이다"라고 알려줍니다.
                                // 하지만 이 경우, @Input() 데코레이터가 Angular에게 해당 프로퍼티에 값이 전달될 것이므로 별도의 초기화가 필요하지 않습니다. 

  public googleAPIKey: string = 'AIzaSyCLBKg94a1MOUItD6wmXtck656wp9ajs-A';

  constructor() { }

  ngOnInit(): void {
  }

}
