import { Component, OnInit, Input } from '@angular/core';
import { RevealWindowService } from './reveal-window.service';

@Component({
  selector: 'reveal-window',
  templateUrl: './reveal-window.component.html',
  styleUrls: ['./reveal-window.component.scss']
})
export class RevealWindowComponent implements OnInit {
  @Input() title;
  @Input() icon;
  @Input() toolbarPosition: string = 'relative';

  closeReveal: boolean;

  usuario: any = {
    nome: null,
    email: null
  };

  constructor(private revealService: RevealWindowService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.revealService.close();
  }
}
