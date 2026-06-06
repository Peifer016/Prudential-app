import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  ClienteAsociado,
  ClienteListadoResponse,
} from '../../../../interfaces/clienteListar.interface';
import { ClientesService } from '../../../../services/clientes.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  cargando: boolean = false;
  busqueda: string = '';
  mostrarFiltros: boolean = false;

  clientesOriginales: ClienteAsociado[] = [];
  clientesPaginados: ClienteAsociado[] = [];
  codigoAsesor: string = '00000686';

  // Variables de paginación
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalPaginas: number = 0;

  constructor(
    private router: Router,
    private clientesService: ClientesService,
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.clientesService.listarClientes(this.codigoAsesor).subscribe({
      next: (response: ClienteListadoResponse) => {
        this.clientesOriginales = response.ListaClientesAsociados || [];
        this.actualizarPaginacion();
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
      },
    });
  }

  detalleCliente(tipoDocumento: string, numeroDocumento: string) {
    this.router.navigate(['/clientes/detalle'], {
      queryParams: {
        TipoDocumento: tipoDocumento,
        NumeroDocumento: numeroDocumento,
      },
    });
  }

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  // Clientes filtrados (incluyendo filtro de fecha)
  get clientesFiltrados() {
    let resultado = [...this.clientesOriginales];

    // Filtro por fecha de contrato (CORREGIDO)
    if (this.filtros.fechaContrato && this.filtros.fechaContrato.trim().length > 0) {
      const fechaFiltro = this.filtros.fechaContrato; // Formato YYYY-MM-DD

      resultado = resultado.filter((cliente) => {
        if (!cliente.FechaContrato) return false;

        // Convertir la fecha del cliente a formato YYYY-MM-DD
        const fechaCliente = new Date(cliente.FechaContrato);
        const año = fechaCliente.getFullYear();
        const mes = String(fechaCliente.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaCliente.getDate()).padStart(2, '0');
        const fechaClienteStr = `${año}-${mes}-${dia}`;

        // Comparar solo la fecha (sin hora)
        return fechaClienteStr === fechaFiltro;
      });
    }

    // Filtro por búsqueda
    if (this.busqueda && this.busqueda.trim().length > 0) {
      const busquedaLower = this.busqueda.toLowerCase().trim();
      resultado = resultado.filter(
        (cliente) =>
          cliente.NombreCompleto?.toLowerCase().includes(busquedaLower) ||
          cliente.NumIdentidad?.includes(busquedaLower) ||
          cliente.Telefono?.includes(busquedaLower) ||
          cliente.Email?.toLowerCase().includes(busquedaLower),
      );
    }

    return resultado;
  }

  actualizarPaginacion(): void {
    const totalElementos = this.clientesFiltrados.length;
    this.totalPaginas = Math.ceil(totalElementos / this.elementosPorPagina);

    if (this.paginaActual > this.totalPaginas && this.totalPaginas > 0) {
      this.paginaActual = this.totalPaginas;
    }
    if (this.paginaActual < 1) {
      this.paginaActual = 1;
    }

    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.clientesPaginados = this.clientesFiltrados.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) {
      return;
    }
    this.paginaActual = pagina;
    this.actualizarPaginacion();
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.cambiarPagina(this.paginaActual + 1);
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.cambiarPagina(this.paginaActual - 1);
    }
  }

  get paginasArray(): number[] {
    const paginas: number[] = [];
    const maxPaginasMostradas = 5;

    if (this.totalPaginas <= maxPaginasMostradas) {
      for (let i = 1; i <= this.totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      const inicio = Math.max(1, this.paginaActual - 2);
      const fin = Math.min(this.totalPaginas, inicio + maxPaginasMostradas - 1);

      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }

      if (inicio > 1) {
        paginas.unshift(-1);
        paginas.unshift(1);
      }

      if (fin < this.totalPaginas) {
        paginas.push(-1);
        paginas.push(this.totalPaginas);
      }
    }

    return paginas;
  }

  getEstadoStyle(estado: string) {
    if (estado === 'Activo') return 'bg-emerald-100 text-emerald-600';
    if (estado === 'Inactivo') return 'bg-slate-200 text-slate-500';
    if (estado === 'Bloqueado') return 'bg-pink-100 text-pink-500';
    return 'bg-gray-100 text-gray-500';
  }

  onSearch(event: any) {
    this.paginaActual = 1;
    this.actualizarPaginacion();

    if (this.busqueda.length > 0) {
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 500);
    } else {
      this.cargando = false;
    }
  }

  // Filtros actualizados con fechaContrato
  filtros: any = {
    perfil: '',
    tratamiento: '',
    estado: '',
    fechaContrato: '', // NUEVO: filtro de fecha
  };

  seleccionarUnico(grupo: string, valor: string) {
    this.filtros[grupo as keyof typeof this.filtros] =
      this.filtros[grupo as keyof typeof this.filtros] === valor ? '' : valor;

    this.paginaActual = 1;
    this.actualizarPaginacion();

    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 300);
  }

  // NUEVO: Método para aplicar filtro de fecha
  aplicarFiltroFecha(event: any): void {
    this.filtros.fechaContrato = event.target.value;
    this.paginaActual = 1;
    this.actualizarPaginacion();

    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 300);
  }

  // NUEVO: Método para limpiar filtro de fecha
  limpiarFiltroFecha(): void {
    this.filtros.fechaContrato = '';
    this.paginaActual = 1;
    this.actualizarPaginacion();

    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 300);
  }

  limpiarFiltros() {
    this.filtros = {
      perfil: '',
      tratamiento: '',
      estado: '',
      fechaContrato: '', // NUEVO: limpiar también la fecha
    };
    this.busqueda = '';

    this.paginaActual = 1;
    this.actualizarPaginacion();

    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 300);
    this.mostrarFiltros = false;
  }

  copyToClipboard(texto: string): void {
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        console.log('Texto copiado:', texto);
      })
      .catch((err) => {
        console.error('Error al copiar:', err);
      });
  }
}
