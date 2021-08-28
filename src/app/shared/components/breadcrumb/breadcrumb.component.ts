import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Output() onSelectStepEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() step: any;
  @Input() enabled: boolean;  
  @Output() onSelectCloseBreadCrumb: EventEmitter<any> = new EventEmitter<any>();

  oneIsEnabled: boolean;
  twoIsEnabled: boolean;
  threeIsEnabled: boolean;
  hideCloseButton: boolean;

  constructor() { }

  ngAfterViewInit() {

    const buttons = document.querySelectorAll('.breadcrumb-item');

    Array.from(buttons)
      .forEach((button: any) => {
        const spans = button.children;
        Array.from(spans)
          .forEach((span: any) => {
            span.style.paddingTop = '8px';
          })
      })
  }

  ngDoCheck() {
    if (this.enabled) {
      switch (this.step) {
        case 2:
          this.twoIsEnabled = true;
          this.threeIsEnabled = true;
          this.oneIsEnabled = true;;
          break;
        case 3:
          this.threeIsEnabled = true;
          this.twoIsEnabled = true;
          this.oneIsEnabled = true;;
          break;
      }
    }
    else {
      this.oneIsEnabled = false;
      this.twoIsEnabled = false;
      this.threeIsEnabled = false;
    }
  }

  ngOnInit(): void {
    this.onSelectStepEvent.emit(this.step);
    const closeButton = (<HTMLElement>document.querySelector('.button-close'));
    closeButton.style.opacity = '0';
  }

  onSelectStep(event) {
    this.step = event.target.innerText;
    this.onSelectStepEvent.emit(this.step);
  }

  activeBreadcrumb(step) {
    const formIsOkay = localStorage.getItem('formIsOkay');

    if (this.step == step && formIsOkay === 'true') {
      localStorage.setItem('ultimoPassoSelecionado', this.step);
      return true;
    }

  }

  activeBreadCrumbAlways(step) {
    const formIsOkay = localStorage.getItem('formIsOkay');
    return (this.step == 1 || formIsOkay === 'false');
  }

  onCloseBreadCrumb(event) {
    const breadcrumb = (<HTMLElement>document.querySelector('#breadCrumbContainer'));
    breadcrumb.style.top = '57px';
    breadcrumb.style.pointerEvents = 'auto';

    const closeButton = (<HTMLElement>document.querySelector('.button-close'));
    closeButton.style.opacity = '0';   
    
  }
}
