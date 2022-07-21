import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClientesService} from "../../services/clientes.service";
import {HttpClient} from "@angular/common/http";
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";

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

  constructor(
    private clienteService: ClientesService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: listaClientes => {
        this.clientes = listaClientes
      },
      error: err => console.log('ERRO: ', err),
      complete: () => {}
    });
  }

  onSaved($event: any) {

    if($event.changes.length !== 0) {

      switch ($event.changes[0].type) {
        case 'insert':
          this.clienteService.postCliente($event.changes[0].data)
            .subscribe({
              next: () => console.log,
              error: err => console.log('ERRO: ', err),
              complete: () => console.log
            })
          break;

        case 'update':
          let data = $event.changes[0].data;
          this.clienteService.putCliente(data, data.id)
            .subscribe({
              next: () => console.log,
              error: err => console.log(err),
              complete: () => console.log
            })
          break;

        case 'remove':
          let id = $event.changes[0].key;
          this.clienteService.deleteCliente(id)
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
