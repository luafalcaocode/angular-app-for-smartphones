import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() quantidadeResultados: any;
  @Input() resultados: any[];

  @Input() height: string;
  @Input() statusPesquisa: string;

  @Input() isVisible: boolean;

  @Input() pagina: number;
  @Input() quantidade: number;

  @Output() hiding: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onTyping: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseSearch: EventEmitter<any> = new EventEmitter<any>();

  autofocusAtivado: boolean;
  scroll: boolean;

  timeout: any;

  campoPesquisa: string;
  mensagemCarregandoCadastro: string = 'Carregando...';
  valorPesquisado: string;

  @ViewChild('campoBuscaAnuncios') campoBusca: HTMLInputElement;

  constructor(private commonService: CommonService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setStyles();
  }



  onScroll(event) {
    this.scroll = true;
    const totalPaginas = Math.ceil((this.quantidadeResultados / 4));
    if (this.pagina < totalPaginas && this.valorPesquisado) {
      this.pagina++;
      this.scroll = false;
      this.valorPesquisado = this.valorPesquisado.trim();
      this.onSearch.emit({ element: this, value: this.valorPesquisado, pagina: this.pagina, jaFezUmaPesquisaAntes: true });
    }

  }

  setStyles() {
    const interval = setInterval(() => {
      const element = document.getElementById('campoBuscaAnuncios');
      if (element) {
        element.focus();
        localStorage.setItem('autofocus_pesquisa_ativado', 'true');
        clearInterval(interval);
      }
    }, 100);
  }

  verificarSeAutofocusFoiAtivado() {
    const autofocus = localStorage.getItem('autofocus_pesquisa_ativado');
    return (autofocus == 'true');
  }

  quandoUsuarioClicarEmPesquisar(event) {
    if ((event.keyCode == 13 || event.which == 13) && event.target.value) {
      document.getElementById('campoBuscaAnuncios').blur();
      this.valorPesquisado = event.target.value.trim();
      this.onSearch.emit({ element: this, value: this.valorPesquisado });
    }
  }

  quandoUsuarioClicarNoIconeFechar(event) {
    this.valorPesquisado = '';
    this.onCloseSearch.emit(true);
  }


  onClickWest(event) {
    this.hiding.emit(true);
    this.autofocusAtivado = false;
  }

  onOpen(data) {
    this.commonService.navigateTo(data);
  }


}
