import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, take} from "rxjs";
import {Produto} from "../../models/produto";

const API = 'http://localhost:8080/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  requestProduto(metodo: string, produto?: Produto, id?: any){
    let result: Observable<Produto[]> | undefined;
    switch (metodo) {
      case 'GET':
        result = this.http.get<Produto[]>(API);
        break;
      case 'POST':
        result = this.http.post<Produto[]>(API, produto)
        break;
      case 'PUT':
        result = this.http.put<Produto[]>(`${API}/${id}`, produto)
        break;
      case 'DELETE':
        result = this.http.delete<Produto[]>(`${API}/${id}`)
        break;
    }
    if(result) {
      return result.pipe(take(1));
    }
    return;
  }
}
