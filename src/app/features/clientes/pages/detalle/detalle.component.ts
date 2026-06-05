import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClientesService } from '../../../../services/clientes.service';
import { ClienteDetalle } from '../../../../interfaces/clienteDetalle.interface';

@Component({
   selector: 'app-detalle',
  standalone: true, // ✅ Importante: igual que ListadoComponent
  imports: [CommonModule, RouterModule], // ✅ Mismos imports que ListadoComponent
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  sections = {
    principales: true,
    personales: true,
    contratos: true,
    conyuge: true,
  };

  cliente: ClienteDetalle | null = null;
  loading: boolean = true;
  error: string = '';

  // Datos de ejemplo (los que no vienen de la API)
  datosPersonales = {
    estadoCivil: 'Unión de hecho',
    lugarNacimiento: 'Arequipa',
    gradoInstruccion: 'Técnico',
    ocupacion: 'Técnico electricista',
    puesto: 'Gerente General',
    departamento: 'Arequipa',
    sexo: 'Masculino',
    fechaNacimiento: '15/07/1988', // ✅ Agregado
    nacionalidad: 'Peruana',
    tipoTrabajo: 'Independiente',
    razonSocial: 'Servicios Eléctricos Ramírez EIRL',
    antiguedad: '8 años',
    provincia: 'Arequipa'
  };

  // Datos de contratos (ejemplo)
  contratos = [
    {
      fechaCreacion: '10/11/2023',
      tipoContrato: 'Individual',
      numeroContrato: '589741',
      participantes: 'Luis Ramírez y Dana Estrada'
    },
    {
      fechaCreacion: '10/11/2024',
      tipoContrato: 'Mancomunado',
      numeroContrato: '589742',
      participantes: 'Luis Ramírez y Dana Estrada 2'
    },
    {
      fechaCreacion: '10/11/2025',
      tipoContrato: 'Individual',
      numeroContrato: '589743',
      participantes: 'Luis Ramírez y Dana Estrada 3'
    }
  ];

  // Datos del cónyuge (ejemplo)
  datosConyuge = {
    nombreCompleto: 'Dana Cristina Estrada Fernández',
    regimen: 'Sociedad de Gananciales',
    nacionalidad: 'Peruana',
    tipoDocumento: 'DNI',
    numeroDocumento: '46781239'
  };

  constructor(
    private router: Router,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    // Puedes pasar los parámetros desde la ruta o usar valores fijos para prueba
    const tipoDocumento = '01'; // DNI
    const numeroDocumento = '10265992';
    this.cargarCliente(tipoDocumento, numeroDocumento);
  }

  cargarCliente(tipoDocumento: string, numeroDocumento: string): void {
    this.loading = true;
    this.error = '';

    this.clientesService.buscarCliente(tipoDocumento, numeroDocumento)
      .subscribe({
        next: (response) => {
          this.cliente = response;
          this.loading = false;
          console.log('Cliente cargado:', response);
        },
        error: (error) => {
          console.error('Error al cargar cliente:', error);
          this.error = 'No se pudo cargar la información del cliente';
          this.loading = false;
        }
      });
  }

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
    console.log('Menú cerrado');
  }

  toggleSection(section: string) {
    this.sections[section as keyof typeof this.sections] =
      !this.sections[section as keyof typeof this.sections];
  }
}