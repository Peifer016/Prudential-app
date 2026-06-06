import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../../../services/clientes.service';
import { ClienteDetalle } from '../../../../interfaces/clienteDetalle.interface';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  sections = {
    principales: true,
    personales: true,
    dependientes: true,
    contratos: true,
  };

  cliente: ClienteDetalle | null = null;
  loading: boolean = true;
  error: string = '';
  perfilRiesgo: string = '';
  dependientes: any[] = [];
  contratos: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tipoDocumento = params['TipoDocumento'] || '01';
      const numeroDocumento = params['NumeroDocumento'] || '10265992';

      this.cargarCliente(tipoDocumento, numeroDocumento);
    });
  }

  cargarCliente(tipoDocumento: string, numeroDocumento: string): void {
    this.loading = true;
    this.error = '';

    this.clientesService.buscarCliente(tipoDocumento, numeroDocumento).subscribe({
      next: (response: ClienteDetalle) => {
        this.cliente = response;

        // Extraer perfil de tolerancia al riesgo
        if (response.PerfilTolerancia && response.PerfilTolerancia.length > 0) {
          this.perfilRiesgo = response.PerfilTolerancia[0].Perfil;
        }

        // Extraer dependientes
        this.dependientes = response.Dependientes || [];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'No se pudo cargar la información del cliente';
        this.loading = false;
      },
    });
  }

  getTipoDocumentoTexto(tipo: string): string {
    const tipos: { [key: string]: string } = {
      '01': 'DNI',
      '04': 'Carnet de Extranjería',
      '06': 'RUC',
      '07': 'Pasaporte',
    };
    return tipos[tipo] || tipo;
  }

  getSexoTexto(sexo: string): string {
    const sexos: { [key: string]: string } = {
      '01': 'Masculino',
      '02': 'Femenino',
    };
    return sexos[sexo] || sexo;
  }

  getEstadoCivilTexto(estado: string): string {
    const estados: { [key: string]: string } = {
      '01': 'Soltero/a',
      '02': 'Casado/a',
      '03': 'Divorciado/a',
      '04': 'Viudo/a',
      '05': 'Conviviente',
    };
    return estados[estado] || estado;
  }

  detalleCliente(tipoDocumento: string, numeroDocumento: string) {
    this.router.navigate(['/clientes/detalle'], {
      queryParams: {
        TipoDocumento: tipoDocumento,
        NumeroDocumento: numeroDocumento,
      },
    });
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
