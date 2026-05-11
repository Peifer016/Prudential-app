import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- IMPORTANTE: Añade esto

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- IMPORTANTE: Inclúyelo aquí
  templateUrl: './listado.component.html',
})
export class ListadoComponent {
  cargando: boolean = false;
  busqueda: string = '';
  mostrarFiltros: boolean = false;

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  clientes = Array(10)
    .fill({
      fecha: '12/01/2026',
      nombre: 'Lucía Ramos Fernández',
      doc: '45897231',
      cel: '999872638',
      correo: 'lucia.ramos@gmail.com',
      estado: 'Activo',
    })
    .map((c, i) => {
      if (i === 2) return { ...c, estado: 'Inactivo' };
      if (i === 3) return { ...c, estado: 'Bloqueado' };
      return c;
    });

  getEstadoStyle(estado: string) {
    if (estado === 'Activo') return 'bg-emerald-100 text-emerald-600';
    if (estado === 'Inactivo') return 'bg-slate-200 text-slate-500';
    if (estado === 'Bloqueado') return 'bg-pink-100 text-pink-500';
    return '';
  }

  onSearch(event: any) {
    // Al usar ngModel, la variable ya se actualiza sola,
    // pero mantenemos el delay para el efecto visual de carga
    if (this.busqueda.length > 0) {
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 800);
    } else {
      this.cargando = false;
    }
  }

  // En tu ListadoComponent
  filtros: any = {
    perfil: '',
    tratamiento: '',
    estado: '',
  };

  seleccionarUnico(grupo: string, valor: string) {
    // Si el valor ya es el mismo, lo limpiamos (desmarcar), si no, asignamos el nuevo
    this.filtros[grupo as keyof typeof this.filtros] =
      this.filtros[grupo as keyof typeof this.filtros] === valor ? '' : valor;
  }
}
