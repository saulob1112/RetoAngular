import { Component, inject } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent {
  formulario: FormGroup;
  producto: Producto = new Producto();
  id!: number;

  private productoServicio = inject(ProductoService);
  private ruta = inject(ActivatedRoute);
  private enrutador = inject(Router);

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      existencia: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductoPorId(this.id).subscribe({
      next: (datos) => this.producto = datos,
      error: (errores: any) => console.log(errores)
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      return;
    }    
    this.guardarProducto();
  }

  guardarProducto() {
    this.productoServicio.editarProducto(this.id, this.producto).subscribe({
      next: (datos) => this.irProductoLista(),
      error: (errores: any) => console.log(errores)
    });
  }

  irProductoLista() {
    this.enrutador.navigate(['/productos']);
  }

}
