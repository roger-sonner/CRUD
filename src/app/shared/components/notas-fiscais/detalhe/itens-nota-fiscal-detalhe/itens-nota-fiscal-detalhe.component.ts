import {AfterViewInit, Component, Input} from '@angular/core';
import {ItemNotaFiscal} from "../../../../../models/item-nota-fiscal";
import {ItensNotaFiscalService} from "../../../../services/itens-nota-fiscal.service";

@Component({
  selector: 'itens-nota-fiscal-detalhe',
  templateUrl: './itens-nota-fiscal-detalhe.component.html',
  styleUrls: ['./itens-nota-fiscal-detalhe.component.scss']
})
export class ItensNotaFiscalDetalheComponent implements AfterViewInit {

  @Input() key: number | undefined;

  itensNotaFiscal: ItemNotaFiscal[] = [];

  constructor(private itensNotaFiscalService: ItensNotaFiscalService) {
  }

  ngAfterViewInit() {

    this.itensNotaFiscalService.getItensNotaFiscalId(this.key).subscribe({
      next: value => {
        this.itensNotaFiscal = value;
        //console.log(this.itensNotaFiscal)
      },
      error: err => console.log(err),
      complete: () => console.log
    });
  }

  completedValue(rowData: { Status: string; }) {
    return rowData.Status = this.itensNotaFiscal.toString();
  }

  getValorUnitarioVenda(rowData: any) {
    return rowData.valorTotal / rowData.quantidade;
  }
}
