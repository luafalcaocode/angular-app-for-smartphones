import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'simple-carousel',
  templateUrl: './simple-carousel.component.html',
  styleUrls: ['./simple-carousel.component.scss']
})
export class SimpleCarouselComponent implements OnInit {

  @Output() carousel: EventEmitter<any> = new EventEmitter<any>();
  @Input() images: any[] = new Array(4);
  hasLoop: boolean;


  constructor() { }


  ngOnInit(): void {
    this.images = [
      { path: '' },
      { path: '' },
      { path: '' },
      { path: '' }
    ]

    this.carousel.emit(this);
  }

  clearEmptySpaceAtImages() {
    do {
      this.images.forEach((item, index) => {
       if (!item.path) {
        this.images.splice(index, 1);
       }
      });
    } while (this.images.filter(item => !item.path).length > 0);
  }

}
