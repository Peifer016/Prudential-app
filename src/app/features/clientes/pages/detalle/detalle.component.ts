import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent {
  sections = {
    principales: true,
    personales: true,
    contratos: true,
    conyuge: true,
  };

  constructor(private router: Router) {}

  irADetalle() {
    this.router.navigate(['/clientes/detalle']);
  }

  irAInversiones() {
    this.router.navigate(['/clientes/inversiones']);
  }

  irAOperaciones() {
    this.router.navigate(['/clientes/operaciones']);
  }

  cerrarMenu() {
    // Aquí va tu lógica para cerrar el menú
    console.log('Menú cerrado');
  }

  toggleSection(section: string) {
    this.sections[section as keyof typeof this.sections] =
      !this.sections[section as keyof typeof this.sections];
  }
}
