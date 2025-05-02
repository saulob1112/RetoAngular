import { Component, inject } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  imports: [],
  templateUrl: './producto-lista.component.html'
})
export class ProductoListaComponent {
  productos!: Producto[];

  private productoServicio = inject(ProductoService);
  private enrutador = inject(Router);

  ngOnInit() {
    this.obtenerProductos();
  }

  private obtenerProductos() {
    this.productoServicio.obtenerProductosLista().subscribe(
      {
        next: (datos) => {
          this.productos = datos;
        }, 
        error: (error) => {
          console.error('Error al obtener la lista de productos', error);
        }
      }
    )
  }

  editarProducto(id: number) {
    this.enrutador.navigate(['editar-producto', id]);
  }

  eliminarProducto(id: number) {
    this.productoServicio.eliminarProducto(id).subscribe({
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      });
  }
}
