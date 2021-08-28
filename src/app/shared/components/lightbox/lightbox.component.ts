import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  @Input() isVisible: boolean;
  @Input() hideForSecurity: boolean;
  @Input() darkerThanBlack: boolean;
  
  @Output() onCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.onCloseEvent.emit(true);
  }

  

}
