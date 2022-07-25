import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {ItemNotaFiscal} from "../../models/item-nota-fiscal";


const API = 'http://localhost:8080/itensNotaFiscal';

@Injectable({
  providedIn: 'root'
})
export class ItensNotaFiscalService {

  constructor(private http: HttpClient) { }

  getItensNotaFiscalId(id: number | undefined): Observable<ItemNotaFiscal[]> {
    return this.http
      .get<ItemNotaFiscal[]>(`${API}/${id}`)
      .pipe(take(1));
  }

  getItensNotasFiscais(): Observable<ItemNotaFiscal[]> {
    return this.http
      .get<ItemNotaFiscal[]>(API)
      .pipe(take(1));
  }

}
