import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SideNavInnerToolbarModule, SideNavOuterToolbarModule, SingleCardModule} from './layouts';
import {
  ChangePasswordFormModule,
  CreateAccountFormModule,
  FooterModule,
  LoginFormModule,
  ResetPasswordFormModule
} from './shared/components';
import {AppInfoService, AuthService, ScreenService} from './shared/services';
import {UnauthenticatedContentModule} from './unauthenticated-content';
import {AppRoutingModule} from './app-routing.module';
import {ClientesComponent} from './shared/components/clientes/clientes.component';
import {ProdutosComponent} from './shared/components/produtos/produtos.component';
import {NotasFiscaisComponent} from './shared/components/notas-fiscais/notas-fiscais.component';
import {ClientesService} from "./shared/services/clientes.service";
import {ProdutosService} from "./shared/services/produtos.service";
import {NotasFiscaisService} from "./shared/services/notas-fiscais.service";
import {DxDataGridModule, DxFormModule, DxLookupModule, DxSelectBoxModule, DxValidatorModule} from "devextreme-angular";
import {HttpClientModule} from "@angular/common/http";
import { ItensNotaFiscalDetalheComponent } from './shared/components/notas-fiscais/detalhe/itens-nota-fiscal-detalhe/itens-nota-fiscal-detalhe.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProdutosComponent,
    NotasFiscaisComponent,
    ItensNotaFiscalDetalheComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxDataGridModule,
    HttpClientModule,
    DxFormModule,
    DxValidatorModule,
    DxLookupModule,
    DxSelectBoxModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    ClientesService,
    ProdutosService,
    NotasFiscaisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
