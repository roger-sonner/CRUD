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


  tasksDataSource: DataSource | undefined;
  tasks: Task[] | undefined;

  constructor(private notasFiscaisService: NotasFiscaisService) {
  }

  ngAfterViewInit() {
    // console.log('@Input() key', this.key);
    // this.notasFiscaisService.getItensNotaFiscalId(this.key).subscribe({
      this.notasFiscaisService.getItensNotasFiscais().subscribe({
        next: value => {
          this.itensNotaFiscal = value;
          console.log(typeof this.itensNotaFiscal);
          console.log('ItensNotaFiscalDetalheComponent => ', this.itensNotaFiscal)
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
