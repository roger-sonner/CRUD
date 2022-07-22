import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NotaFiscal} from "../../../models/nota-fiscal";
import {NotasFiscaisService} from "../../services/notas-fiscais.service";
import {DxDataGridComponent} from "devextreme-angular";
import DevExpress from "devextreme";

@Component({
  selector: 'app-notas-fiscais',
  templateUrl: './notas-fiscais.component.html',
  styleUrls: ['./notas-fiscais.component.scss']
})
export class NotasFiscaisComponent implements OnInit {

  // https://community.devexpress.com/blogs/aspnet/archive/2017/02/08/getting-started-with-angular-2-devextreme.aspx

  // https://supportcenter.devexpress.com/ticket/details/t724854/how-to-implement-crud-in-a-master-detail-datagrid

  // https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/MasterDetailAPI/Angular/Light/

  // https://supportcenter.devexpress.com/ticket/details/t704410/datagrid-how-to-implement-crud-operations-in-master-detail

  // https://github.com/DevExpress/DevExtreme.AspNet.Data
  // ver o tópico: Lado do cliente sem jQuery (Angular, etc.)

  /*
      https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/AdvancedMasterDetailView/Angular/Light/
      https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/MasterDetailView/Angular/Light/
   */

  @ViewChild (DxDataGridComponent , { static : false }) dataGrid : DxDataGridComponent | undefined

  notasFiscais: NotaFiscal[] = [];

  captionDetalhe: string = 'Cabeçalho do detalhe';


  constructor(private notasFiscaisService: NotasFiscaisService) { }

  ngOnInit(): void {
    this.notasFiscaisService.getNotasFiscais().subscribe({
      next: value => {
        this.notasFiscais = value
        //console.log(value);
      },
      error: err => console.log(err),
      complete: () => console.log
    })


  }

  onSaved($event: any) {

    if($event.changes.length !== 0) {

      switch ($event.changes[0].type) {

        case 'insert':
          this.notasFiscaisService.postNotaFiscal($event.changes[0].data)
            .subscribe({
              next: () => console.log,
              error: err => console.log('ERRO: ', err),
              complete: () => console.log
            });
          break;

        case 'update':
          this.notasFiscaisService.putNotaFiscal($event.changes[0].data, $event.changes[0].data.id)
            .subscribe({
              next: () => console.log,
              error: err => console.log(err),
              complete: () => console.log
            });
          break;

        case 'remove':
          this.notasFiscaisService.deleteNotaFiscal($event.changes[0].key)
            .subscribe({
              next: () => console.log,
              error: err => console.log(err),
              complete: () => console.log
            });
          break

      }
      this.dataGrid?.instance.refresh();
    }
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
