import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import bulmaCalendar from '../../../../../node_modules/bulma-calendar/dist/js/bulma-calendar';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: any;
  isLoading: boolean;

  isDateSelected: boolean;
  isCalendarOpen

  @Input() element: string;
  @Input() label: string;

  @Output() onSelectedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClearEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.calendar = bulmaCalendar;
    this.isLoading = true;
  }

  ngOnInit() {

  }

  ngOnChanges(): void {

    const interval = setInterval(() => {
      const newCalendar: any = document.querySelector('.' + this.element);

      if (newCalendar) {
        this.calendar.attach(newCalendar, {
          type: 'date',
          dateFormat: 'DD/MM/YYYY',
          displayMode: 'dialog',
          minuteSteps: 1,
          closeOnSelect: true,
          closeOnOverlayClick: false,
          showHeader: false,

          validateLabel: 'Confirmar',
          todayLabel: 'Hoje',
          clearLabel: 'Limpar',
          cancelLabel: 'Cancelar'
        });

        newCalendar.bulmaCalendar.on('select', (datepicker) => {
          if (datepicker.data && datepicker.data.value()) {
            this.onSelectedEvent.emit({
              campo: this.element,
              value: datepicker.data.value()
            });
            this.isDateSelected = true;
          }
        });

        newCalendar.bulmaCalendar.on('clear', () => {
           this.onClearEvent.emit(true);
           this.isDateSelected = false;
        });

        newCalendar.bulmaCalendar.on('show', () => {
          this.isCalendarOpen = true;
        });

        newCalendar.bulmaCalendar.on('hide', () => {
          this.isCalendarOpen = false;
        });

        clearInterval(interval);

        setTimeout(() => {
          this.isLoading = false;
        }, 700)
      }

    }, 100);

  }
}
