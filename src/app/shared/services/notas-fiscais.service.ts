import { Injectable } from '@angular/core';
import {Observable, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NotaFiscal} from "../../models/nota-fiscal";
import {Produto} from "../../models/produto";

const API = 'http://localhost:8080/notasFiscais';

@Injectable({
  providedIn: 'root'
})
export class NotasFiscaisService {

  // dropdownbox - ver se pode ser usado para produtos e clientes
  // https://github.com/DevExpress-Examples/Form---Declare-dropdownbox-in-a-form-item/tree/20.1.6%2B/Angular/src/app

  constructor(private http: HttpClient) { }

  requestNotasFiscais(metodo: string, notaFiscal?: NotaFiscal, id?: any) {
    let result: Observable<NotaFiscal[]> | undefined;

    switch (metodo) {
      case 'GET':
        result = this.http.get<NotaFiscal[]>(API);
        break
      case 'POST':
        result = this.http.post<NotaFiscal[]>(API, notaFiscal);
        break;
      case 'PUT':
        result = this.http.put<NotaFiscal[]>(`${API}/${id}`, notaFiscal);
        break;
      case 'DELETE':
        result = this.http.delete<NotaFiscal[]>(`${API}/${id}`);
        break;
    }
    if(result) {
      return result.pipe(take(1));
    }
    return;
  }
  /*
  getNotasFiscais(): Observable<NotaFiscal[]> {
    return this.http
      .get<NotaFiscal[]>(API)
      .pipe(take(1));
  }

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
*/
}
