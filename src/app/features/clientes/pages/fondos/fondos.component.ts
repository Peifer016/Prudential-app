import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FondosService } from '../../../../services/fondos.service';
import { Fondo, FondosResponse } from '../../../../interfaces/fondoListado.interface';

@Component({
  selector: 'app-fondos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './fondos.component.html',
})
export class FondosComponent implements OnInit {
  fondos: Fondo[] = [];
  fondosFiltrados: Fondo[] = [];
  busqueda: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(private fondosService: FondosService) {}

  ngOnInit(): void {
    this.cargarFondos();
  }

  cargarFondos(): void {
    this.loading = true;
    this.fondosService.listarFondos().subscribe({
      next: (response: FondosResponse) => {
        this.fondos = response.Fondos || [];
        this.fondosFiltrados = this.fondos;
        this.loading = false;
        console.log('Fondos cargados:', this.fondos);
      },
      error: (error) => {
        console.error('Error al cargar fondos:', error);
        this.error = 'No se pudo cargar la lista de fondos';
        this.loading = false;
      },
    });
  }

  buscarFondos(): void {
    if (!this.busqueda.trim()) {
      this.fondosFiltrados = this.fondos;
      return;
    }

    const busquedaLower = this.busqueda.toLowerCase().trim();
    this.fondosFiltrados = this.fondos.filter(
      (fondo) =>
        fondo.DescripFondo.toLowerCase().includes(busquedaLower) ||
        fondo.CodFondo.includes(busquedaLower) ||
        fondo.DescripFondoSerie.toLowerCase().includes(busquedaLower),
    );
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
    this.fondosFiltrados = this.fondos;
  }

  getColorClase(codFondo: string): string {
    const colores: { [key: string]: string } = {
      '001': 'bg-[#0070c0]',
      '002': 'bg-[#00a161]',
      '003': 'bg-[#ff8c00]',
      '004': 'bg-[#6f42c1]',
      '005': 'bg-[#dc3545]',
      '006': 'bg-[#20c997]',
      '007': 'bg-[#fd7e14]',
    };
    return colores[codFondo] || 'bg-[#748294]';
  }

  getPerfilPorFondo(codFondo: string): string {
    const perfiles: { [key: string]: string } = {
      '001': 'Moderado',
      '002': 'Arriesgado',
      '003': 'Conservador',
      '004': 'Conservador',
      '005': 'Moderado',
      '006': 'Arriesgado',
      '007': 'Moderado',
    };
    return perfiles[codFondo] || 'Moderado';
  }

  getEstadoPorFondo(codFondo: string): string {
    const estados: { [key: string]: string } = {
      '001': 'Activo',
      '002': 'Activo',
      '003': 'Activo',
      '004': 'Activo',
      '005': 'Activo',
      '006': 'Activo',
      '007': 'Activo',
    };
    return estados[codFondo] || 'Activo';
  }
}
