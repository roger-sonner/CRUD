import { Injectable } from '@angular/core';
import {Observable, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NotaFiscal} from "../../models/nota-fiscal";
import {ItemNotaFiscal} from "../../models/item-nota-fiscal";

const API = 'http://localhost:8080/notasFiscais';

@Injectable({
  providedIn: 'root'
})
export class NotasFiscaisService {

  // dropdownbox - ver se pode ser usado para produtos e clientes
  // https://github.com/DevExpress-Examples/Form---Declare-dropdownbox-in-a-form-item/tree/20.1.6%2B/Angular/src/app
  idNotaFiscalAtual: bigint | undefined;

  constructor(private http: HttpClient) { }

  getNotasFiscais(): Observable<NotaFiscal[]> {
    return this.http
      .get<NotaFiscal[]>(API)
      .pipe(take(1));
  }
  //
  // getItensNotaFiscal(id: number): Observable<ItemNotaFiscal[]> {
  //   return this.http
  //     .get<ItemNotaFiscal[]>(`${API}/${id}`)
  //     .pipe(take(1));
  // }

  postNotaFiscal(notaFiscal: NotaFiscal): Observable<NotaFiscal[]>{
    return this.http
      .post<NotaFiscal[]>(API, notaFiscal)
      .pipe(take(1));
  }
  putNotaFiscal(notaFiscal: NotaFiscal, id: number): Observable<NotaFiscal[]>{
    return this.http
      .put<NotaFiscal[]>(`${API}/${id}`, notaFiscal)
      .pipe(take(1));
  }

  deleteNotaFiscal(id: number): Observable<NotaFiscal[]>{
    let temp = `${API}/${id}`;
    return this.http
      .delete<NotaFiscal[]>(`${API}/${id}`)
      .pipe(take(1));
  }

  setIdNotaFiscalAtual(id: bigint){
    this.idNotaFiscalAtual = id;
  }

  getIdNotaFiscalAtual(){
    return this.idNotaFiscalAtual;
  }
}
