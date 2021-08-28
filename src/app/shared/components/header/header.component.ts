import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = "Reencontre";
  @Input() icon: string = "account_circle";
  @Input() toolbarPosition: string = 'fixed';
  @Input() leftIcon: string = 'gps_fixed';
  @Input() titleMarginLeft: string = '-9px';

  @Output() onClickIconEvent: EventEmitter<any> = new EventEmitter<any>();

  maxLengthTitle: number = 20;
  maxWidth: number = 360;


  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }

  getTitle() {
      return (this.title && this.title.length > this.maxLengthTitle && this.maxWidth < 360 ? this.title.substring(0, this.maxLengthTitle) + '...' : this.title);
  }

  onClickIcon() {
    this.onClickIconEvent.emit(this.icon);
  }


  onClickLeftIcon() {
    window.history.back();
  }

  @HostListener('window:resize', ['$event'])
  onResize()
  {
    this.maxWidth = window.innerWidth;
  }
}
