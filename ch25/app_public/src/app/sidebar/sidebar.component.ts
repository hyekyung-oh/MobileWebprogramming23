import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() content: string = ''; // 'content' 속성에 초기화 값을 추가

  constructor() { }

  ngOnInit(): void {
  }
}
