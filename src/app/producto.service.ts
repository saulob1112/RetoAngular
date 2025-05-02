import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = "http://localhost:8080/producto-app/productos";
  private clienteHttp = inject(HttpClient);
  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin')
  })

  obtenerProductosLista(): Observable<Producto[]> {
    return this.clienteHttp.get<Producto[]>(this.urlBase, { headers: this.headers });
  }

  agregarProducto(producto: Producto): Observable<Object> {
    return this.clienteHttp.post(this.urlBase, producto, { headers: this.headers });
  }

  obtenerProductoPorId(id: number) {
    return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`, { headers: this.headers });
  }

  editarProducto(id: number, producto: Producto) {
    return this.clienteHttp.put(`${this.urlBase}/${id}`, producto, { headers: this.headers });
  }

  eliminarProducto(id: number): Observable<Object> {
    return this.clienteHttp.delete(`${this.urlBase}/${id}`, { headers: this.headers });
  }

  constructor() { }
}
