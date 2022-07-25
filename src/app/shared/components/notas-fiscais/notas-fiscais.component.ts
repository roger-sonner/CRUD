import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NotaFiscal} from "../../../models/nota-fiscal";
import {NotasFiscaisService} from "../../services/notas-fiscais.service";
import {DxDataGridComponent} from "devextreme-angular";
import DevExpress from "devextreme";
import {Observable} from "rxjs";
import {Produto} from "../../../models/produto";
import {Cliente} from "../../../models/cliente";
import {ClientesService} from "../../services/clientes.service";

@Component({
  selector: 'app-notas-fiscais',
  templateUrl: './notas-fiscais.component.html',
  styleUrls: ['./notas-fiscais.component.scss']
})
export class NotasFiscaisComponent implements OnInit {

  @ViewChild (DxDataGridComponent , { static : false }) dataGrid : DxDataGridComponent | undefined

  notasFiscais: NotaFiscal[] = [];
  clientes: Cliente[] = [];

  captionDetalhe: string = 'Cabeçalho do detalhe';



  constructor(
    private notasFiscaisService: NotasFiscaisService,
    private clienteService: ClientesService) { }

  ngOnInit(): void {

    this.notasFiscaisService.requestNotasFiscais('GET')?.subscribe({
      next: value => this.notasFiscais = value})


    // https://js.devexpress.com/Demos/Widgetsgallery/Demo/Lookup/Basics/Angular/Light/
    // Usado no Lookup
    this.clienteService.requestCliente('GET')?.subscribe({
      next: value => {this.clientes = value; console.log(this.clientes)}})
  }

  onSaved($event: any) {
    let result: Observable<NotaFiscal[]> | undefined;

    if($event.changes.length !== 0) {

      let data = $event.changes[0].data;
      let idNotaFiscal = $event.changes[0].key

      switch ($event.changes[0].type) {

        case 'insert':

          console.log(data);

          result = this.notasFiscaisService.requestNotasFiscais('POST', data);
          break;

        case 'update':
          result = this.notasFiscaisService.requestNotasFiscais('PUT', data, data.id);
          break;

        case 'remove':
          result = this.notasFiscaisService.requestNotasFiscais('DELETE', idNotaFiscal);
          break

      }
      if(result) {
        result?.subscribe({
          next: () => console.log,
          error: err => console.log(err),
          complete: () => console.log
        })
        this.dataGrid?.instance.refresh();
      }
    }
  }

  getClienteNome(item: any) {
    if (!item) {
      return '';
    }

    return `${item.id} ${item.nome}`;
  }


}

/*
VER SE DÁ PARA USAR O CustomStore PARA IMPLEMENTAR OS MÉTODOS HTTP
getOrderItems(masterKey: any) {
    if (!this.detailStores.hasOwnProperty(masterKey)) {
        const store = new  CustomStore({
            load:function(loadOptions) {
                //use masterKey for loading data
            },
            update: function(key, values) {
                //use masterKey here
            },
            insert: function(values) {
                //use masterKey here
            },
            remove: function(key) {
                //your code here
            }
        });
        this.detailStores[masterKey] = store;
    }
    return this.detailStores[masterKey];
}

OLHAR TAMBÉ NO: https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CRUDOperations/Angular/Light/

this.dataSource = new CustomStore({
      key: 'OrderID',
      load: () => this.sendRequest(`${URL}/Orders`),  // this.service.getClientes...
      insert: (values) => this.sendRequest(`${URL}/InsertOrder`, 'POST', {  // this.service.postCliente...
        values: JSON.stringify(values),
      }),
      update: (key, values) => this.sendRequest(`${URL}/UpdateOrder`, 'PUT', {
        key,
        values: JSON.stringify(values),
      }),
      remove: (key) => this.sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
        key,
      }),
    });

 */
