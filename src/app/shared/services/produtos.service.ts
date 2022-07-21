import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {Cliente} from "../../models/cliente";
import {Produto} from "../../models/produto";

const API = 'http://localhost:8080/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(API)
      .pipe(take(1));
  }

  postProduto(produto: Produto): Observable<Produto[]>{
    return this.http
      .post<Produto[]>(API, produto)
      .pipe(take(1));
  }
  putProduto(produto: Produto, id: number): Observable<Produto[]>{
    let temp = `${API}/${id}`;
    return this.http
      .put<Produto[]>(`${API}/${id}`, produto)
      .pipe(take(1));
  }

  deleteProduto(id: number): Observable<Produto[]>{
    let temp = `${API}/${id}`;
    return this.http
      .delete<Produto[]>(`${API}/${id}`)
      .pipe(take(1));
  }
}
