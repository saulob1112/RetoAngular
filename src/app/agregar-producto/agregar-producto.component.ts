import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-producto',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html'
})
export class AgregarProductoComponent {
  formulario: FormGroup;
  producto: Producto = new Producto();

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      existencia: ['', Validators.required]
    });
  }

  private productoServicio = inject(ProductoService);
  private enrutador = inject(Router);

  onSubmit() {
    if (this.formulario.invalid) {
      return;
    }
    this.guardarProducto();
  }

  guardarProducto() {
    this.productoServicio.agregarProducto(this.producto).subscribe({
      next: (datos) => {
        this.irListaProductos();
      },
      error: (error: any) => {console.log(error)}
    });
  }

  irListaProductos() {
    this.enrutador.navigate(['/productos']);
  }

}
