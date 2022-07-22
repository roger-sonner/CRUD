import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import DataSource from "devextreme/data/data_source";
import {ItemNotaFiscal, ItemNotaFiscal1} from "../../../../../models/item-nota-fiscal";
import ArrayStore from "devextreme/data/array_store";
import {NotasFiscaisService} from "../../../../services/notas-fiscais.service";

@Component({
  selector: 'itens-nota-fiscal-detalhe',
  templateUrl: './itens-nota-fiscal-detalhe.component.html',
  styleUrls: ['./itens-nota-fiscal-detalhe.component.scss']
})
export class ItensNotaFiscalDetalheComponent implements AfterViewInit {

  @Input() key: number | undefined;

  itensNotaFiscal: ItemNotaFiscal[] = [];

  constructor(private notasFiscaisService: NotasFiscaisService) {
  }

  ngAfterViewInit() {
    // console.log('@Input() key', this.key);
    // this.notasFiscaisService.getItensNotasFiscais().subscribe({
    // this.notasFiscaisService.getItensNotaFiscalId(this.key).subscribe({
    this.notasFiscaisService.getItensNotasFiscais().subscribe({
      next: value => {
        this.itensNotaFiscal = value;
      },
      error: err => console.log(err),
      complete: () => console.log
    });

    // this.notasFiscaisService.getItensNotaFiscalId(this.key).subscribe({
    //   next: value => {
    //     this.itensNotaFiscal = value
    //   },
    //   error: err => console.log(err),
    //   complete: () => console.log
    // });


  }

}
