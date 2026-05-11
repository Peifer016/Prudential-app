import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent {
  // Objeto para controlar qué secciones están visibles (todas abiertas por defecto)
  sections = {
    principales: true,
    personales: true,
    contratos: true,
    conyuge: true,
  };

  // Función para alternar el estado
  toggleSection(section: keyof typeof this.sections) {
    this.sections[section] = !this.sections[section];
  }
}
