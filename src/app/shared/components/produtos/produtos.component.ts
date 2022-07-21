import {Component, OnInit, ViewChild} from '@angular/core';
import {Produto} from "../../../models/produto";
import {ClientesService} from "../../services/clientes.service";
import {HttpClient} from "@angular/common/http";
import {ProdutosService} from "../../services/produtos.service";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  @ViewChild (DxDataGridComponent , { static : false }) dataGrid : DxDataGridComponent | undefined

  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutosService) {
  }


  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe({
      next: value => this.produtos = value,
      error: err => console.log('ERRO: ', err),
      complete: () => {}
    });

  }

  onSaved($event: any) {

    if($event.changes.length !== 0) {

      switch ($event.changes[0].type) {
        case 'insert':
          this.produtoService.postProduto($event.changes[0].data)
            .subscribe({
              next: () => console.log,
              error: err => console.log('ERRO: ', err),
              complete: () => console.log
            });
          break;

        case 'update':
          let data = $event.changes[0].data;
          this.produtoService.putProduto(data, data.id)
            .subscribe({
              next: () => console.log,
              error: err => console.log(err),
              complete: () => console.log
            });
          break;

        case 'remove':
          let id = $event.changes[0].key;
          this.produtoService.deleteProduto(id)
            .subscribe({
              next: () => console.log,
              error: err => console.log(err),
              complete: () => console.log
            })
          break;

      }
      this.dataGrid?.instance.refresh();
    }
  }
}
