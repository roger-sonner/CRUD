import {Injectable} from '@angular/core';
import {Cliente} from "../../models/cliente";
import {Observable, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Produto} from "../../models/produto";

const API = 'http://localhost:8080/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) {
  }

  requestCliente(metodo: string, cliente?: Cliente, id?: any){
    let result: Observable<Cliente[]> | undefined;
    switch (metodo) {
      case 'GET':
        result = this.http.get<Cliente[]>(API);
        break;
      case 'POST':
        result = this.http.post<Cliente[]>(API, cliente)
        break;
      case 'PUT':
        result = this.http.put<Cliente[]>(`${API}/${id}`, cliente)
        break;
      case 'DELETE':
        result = this.http.delete<Cliente[]>(`${API}/${id}`)
        break;
    }
    if(result) {
      return result.pipe(take(1));
    }
    return;
  }
}
