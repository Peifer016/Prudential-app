import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Fondo } from '../../../../interfaces/valorCuota.interface';

@Component({
  selector: 'app-fondos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fondos.component.html'
})
export class FondosComponent {
  public fondos: Fondo[] = [
    { 
      nombre: 'Fondo A', 
      perfil: 'Moderado', 
      estado: 'Activo', 
      colorClase: 'bg-[#0070c0]',
      codFondo: '001',
      codAdministradora: '002',
      codFondoSerie: '000'
    },
    { 
      nombre: 'Fondo B', 
      perfil: 'Conservador', 
      estado: 'Inactivo', 
      colorClase: 'bg-[#748294]',
      codFondo: '002',
      codAdministradora: '002',
      codFondoSerie: '001'
    },
    { 
      nombre: 'Fondo C', 
      perfil: 'Arriesgado', 
      estado: 'En campaña', 
      colorClase: 'bg-[#00a161]',
      codFondo: '003',
      codAdministradora: '002',
      codFondoSerie: '002'
    },
    { 
      nombre: 'Fondo D', 
      perfil: 'Demo', 
      estado: 'Activo', 
      colorClase: 'bg-[#0070c0]',
      codFondo: '004',
      codAdministradora: '002',
      codFondoSerie: '003'
    },
    { 
      nombre: 'Fondo E', 
      perfil: 'Demo', 
      estado: 'Activo', 
      colorClase: 'bg-[#0070c0]',
      codFondo: '005',
      codAdministradora: '002',
      codFondoSerie: '004'
    },
    { 
      nombre: 'Fondo F', 
      perfil: 'Demo', 
      estado: 'Activo', 
      colorClase: 'bg-[#0070c0]',
      codFondo: '006',
      codAdministradora: '002',
      codFondoSerie: '005'
    },
    { 
      nombre: 'Fondo G', 
      perfil: 'Demo', 
      estado: 'Activo', 
      colorClase: 'bg-[#0070c0]',
      codFondo: '007',
      codAdministradora: '002',
      codFondoSerie: '006'
    },
    { 
      nombre: 'Fondo H', 
      perfil: 'Demo', 
      estado: 'Activo', 
      colorClase: 'bg-[#0070c0]',
      codFondo: '008',
      codAdministradora: '002',
      codFondoSerie: '007'
    },
  ];
}