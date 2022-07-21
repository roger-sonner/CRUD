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

  constructor(private notasFiscaisService: NotasFiscaisService) { }

  ngAfterViewInit() {

      this.notasFiscaisService.getItensNotaFiscal(2).subscribe({
        next: value => {
          this.itensNotaFiscal = value;
          console.log(this.itensNotaFiscal)
        },
        error: err => console.log(err),
        complete: () => console.log
      });

    //   this.itensNotaFiscalDataSource = new DataSource({
    //   store: new ArrayStore<ItemNotaFiscal>({
    //     data: this.itensNotaFiscal,
    //     key: 'id',
    //   }),
    //   filter: ['nota_fiscal_id', '=', this.key],
    // });
  }

}
