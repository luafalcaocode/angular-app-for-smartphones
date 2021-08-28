import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'full-loading',
  templateUrl: './full-loading.component.html',
  styleUrls: ['./full-loading.component.scss']
})
export class FullLoadingComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() message: string = '';
  @Input() type: string;
  @Input() zIndex: string = '10000';

  @Input() backgroundColor: string;

  color;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {

    switch (this.type) {
      case 'spinner':
        this.backgroundColor = '#fff';
        this.color = '#3f51b5'
        break;
      case 'lightbox':
        this.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        this.color = '#fff';
      case 'indeterminate':
        this.color = '#fff';
      default:
        this.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        this.color = '#fff';
    }
  }
}
