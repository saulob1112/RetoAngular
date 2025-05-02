import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoListaComponent } from "./producto-lista/producto-lista.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, ProductoListaComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'producto-app';
}
