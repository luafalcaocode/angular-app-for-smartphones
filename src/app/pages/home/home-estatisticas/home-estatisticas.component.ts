import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home-estatisticas',
  templateUrl: './home-estatisticas.component.html',
  styleUrls: ['./home-estatisticas.component.scss']
})
export class HomeEstatisticasComponent implements OnInit {
  @Input() estatisticas: any[];

  constructor() {
      this.estatisticas = [
        {
          titulo: 'Desaparecidos',
          subtitulo: 'Desaparecidos',
          quantidade: 2.545,
          link: ''
        },
        {
          titulo: 'Encontrados',
          subtitulo: 'Encontrados',
          quantidade: 2.539,
          link: ''
        },
        {
          titulo: 'Cadastrados',
          subtitulo: 'Cadastrados',
          quantidade: 2.545,
          link: ''
        }
      ]
   }

  ngOnInit(): void {
  }

}
