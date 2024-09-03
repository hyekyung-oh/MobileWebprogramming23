import { Component, OnInit } from '@angular/core';

export class Location {
  _id : string = ''; 
  name : string = ''; 
  distance : number = 0.0;
  address : string = '';
  rating : number = 0.0;
  facilities : string[] = [];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor() { }
  
  name = 'H커피로스터스';

  locations: Location[] = [{
    _id: '6517d718974d857346ad44e6',
    name: 'H커피로스터스',
    distance: 110,
    address: '경기도 안성시 석정동 81번지',
    rating: 4,
    facilities: ['Hot drinks', 'Food', 'Premium wifi']
  },
  {
    _id: '6517d6d2974d857346ad44e5',
    name: '피다',
    distance: 134,
    address: '경기도 안성시 대학로 2',
    rating: 3,
    facilities: ['Hot drinks', 'Food', 'Premium wifi']
  }];

  ngOnInit(): void { } 
  
}