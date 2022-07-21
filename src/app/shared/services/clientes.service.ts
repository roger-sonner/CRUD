import {Injectable} from '@angular/core';
import {Cliente} from "../../models/cliente";
import {Observable, take} from "rxjs";
import {HttpClient} from "@angular/common/http";

const API = 'http://localhost:8080/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) {
  }

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(API)
      .pipe(take(1));
  }

  postCliente(cliente: Cliente): Observable<Cliente[]>{
    return this.http
      .post<Cliente[]>(API, cliente)
      .pipe(take(1));
  }
  putCliente(cliente: Cliente, id: number): Observable<Cliente[]>{
    return this.http
      .put<Cliente[]>(`${API}/${id}`, cliente)
      .pipe(take(1));
  }

  deleteCliente(id: number): Observable<Cliente[]>{
    let temp = `${API}/${id}`;
    return this.http
      .delete<Cliente[]>(`${API}/${id}`)
      .pipe(take(1));
  }
}
