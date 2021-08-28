import { Component, Input, OnInit } from '@angular/core';

export interface List {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss']
})
export class SimpleListComponent implements OnInit {

  @Input() items: any[] = [

  ]

  constructor() { }

  ngOnInit(): void {



  }

}
