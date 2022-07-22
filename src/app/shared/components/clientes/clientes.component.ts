import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClientesService} from "../../services/clientes.service";
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";
import {Observable} from "rxjs";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  @ViewChild (DxDataGridComponent , { static : false }) dataGrid : DxDataGridComponent | undefined

  clientes: Cliente[] = [];

  mensagens: any = {
    addRow: 'Adicionar',
    cancelAllChanges: 'Cancelar',
    cancelRowChanges: 'Cancelar',
    confirmDeleteMessage: 'Confirma',
    confirmDeleteTitle: 'Deletar',
    deleteRow: 'Deletar',
    editRow: 'Editar',
    saveAllChanges: 'Salvar',
    saveRowChanges: 'Salvar',
    undeleteRow: 'Cancelar',
    validationCancelChanges: 'Cancelar'
  }

  operacoesRemotas: any = {
    filtering: true,
    grouping: true,
    groupPaging: true,
    paging: true,
    sorting: true,
    summary: true
  }

  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    this.clienteService.requestCliente('GET')?.subscribe({
      next: value => this.clientes = value,
      error: err => console.log('ERRO: ', err),
      complete: () => {}
    });
  }

  onSaved($event: any) {

    let result: Observable<Cliente[]> | undefined;
    if($event.changes.length !== 0) {

      let data = $event.changes[0].data;
      switch ($event.changes[0].type) {
        case 'insert':
          result = this.clienteService.requestCliente('POST', data);
          break;

        case 'update':
          result = this.clienteService.requestCliente('PUT', data, data.id);
          break;

        case 'remove':
          let id = $event.changes[0].key;
          result = this.clienteService.requestCliente('DELETE', data, id);
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
