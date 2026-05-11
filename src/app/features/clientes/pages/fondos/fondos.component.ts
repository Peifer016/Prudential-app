import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Fondo {
  nombre: string;
  perfil: string;
  estado: string;
  colorClase: string; // Para el borde superior dinámico
}

@Component({
  selector: 'app-fondos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fondos.component.html'
})
export class FondosComponent {
  public fondos: Fondo[] = [
    { nombre: 'Fondo A', perfil: 'Moderado', estado: 'Activo', colorClase: 'bg-[#0070c0]' },
    { nombre: 'Fondo B', perfil: 'Conservador', estado: 'Inactivo', colorClase: 'bg-[#748294]' },
    { nombre: 'Fondo C', perfil: 'Arriesgado', estado: 'En campaña', colorClase: 'bg-[#00a161]' },
    { nombre: 'Fondo D', perfil: 'Demo', estado: 'Activo', colorClase: 'bg-[#0070c0]' },
    { nombre: 'Fondo E', perfil: 'Demo', estado: 'Activo', colorClase: 'bg-[#0070c0]' },
    { nombre: 'Fondo F', perfil: 'Demo', estado: 'Activo', colorClase: 'bg-[#0070c0]' },
    { nombre: 'Fondo G', perfil: 'Demo', estado: 'Activo', colorClase: 'bg-[#0070c0]' },
    { nombre: 'Fondo H', perfil: 'Demo', estado: 'Activo', colorClase: 'bg-[#0070c0]' },
  ];
}