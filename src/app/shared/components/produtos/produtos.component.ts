import {Component, OnInit, ViewChild} from '@angular/core';
import {Produto} from "../../../models/produto";
import {ProdutosService} from "../../services/produtos.service";
import {DxDataGridComponent} from "devextreme-angular";
import {Observable} from "rxjs";


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  @ViewChild (DxDataGridComponent , { static : false }) dataGrid : DxDataGridComponent | undefined
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutosService,
  ) {}

  ngOnInit(): void {
    this.produtoService.requestProduto('GET')?.subscribe({
      next: value => this.produtos = value,
      error: err => console.log('ERRO: ', err),
      complete: () => {}
    });

  }

  onSaved($event: any) {
    let result: Observable<Produto[]> | undefined;
    if($event.changes.length !== 0) {
      let data = $event.changes[0].data;
      switch ($event.changes[0].type) {
        case 'insert':
          result = this.produtoService.requestProduto('POST', $event.changes[0].data);
          break;
        case 'update':
          result = this.produtoService.requestProduto('PUT', data, data.id);
          break;
        case 'remove':
          let id = $event.changes[0].key;
          result = this.produtoService.requestProduto('DELETE', data , id);
          break;
      }
      if(result) {
        result?.subscribe({
          next: () => console.log,
          error: err => console.log(err),
          complete: () => console.log
        })
      }
      this.dataGrid?.instance.refresh();
    }
  }

}
