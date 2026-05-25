import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listado.component.html',
})
export class ListadoComponent {
  cargando: boolean = false;
  busqueda: string = '';
  mostrarFiltros: boolean = false;

  constructor(private router: Router) {}

  irADetalle() {
    this.router.navigate(['/clientes/detalle']);
  }

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  // Datos originales
  private clientesOriginales = Array(20)
    .fill({
      fecha: '12/01/2026',
      nombre: 'Lucía Ramos Fernández',
      doc: '45897231',
      cel: '999872638',
      correo: 'lucia.ramos@gmail.com',
      estado: 'Activo',
    })
    .map((c, i) => {
      const nombres = [
        'Lucía Ramos Fernández',
        'Carlos Mendoza Ríos',
        'María Paredes López',
        'Jorge Delgado Soto',
        'Ana Cecilia Torres',
        'Roberto Flores Paz',
        'Patricia Nuñez del Arco',
        'Fernando Luna Cruz',
        'Isabel Mercado Ríos',
        'Gonzalo Tapia Vega',
        'Raquel Silva Dávila',
        'Héctor Prado Luna',
        'Mónica Vera Castillo',
        'Andrés Reyes Mora',
        'Claudia Paz Osorio',
        'Eduardo Roca Gil',
        'Silvia Mansilla Ríos',
        'Pedro Quispe Mamani',
        'Rosa Barrionuevo Linares',
        'Miguel Ángel Ríos',
      ];
      
      const docs = [
        '45897231', '71234567', '82345678', '93456789', '14567890',
        '25678901', '36789012', '47890123', '58901234', '69012345',
        '70123456', '81234567', '92345678', '13456789', '24567890',
        '35678901', '46789012', '57890123', '68901234', '79012345'
      ];
      
      const correos = [
        'lucia.ramos@gmail.com', 'carlos.mendoza@yahoo.com', 'maria.paredes@outlook.com',
        'jorge.delgado@gmail.com', 'ana.torres@yahoo.com', 'roberto.flores@gmail.com',
        'patricia.nunez@outlook.com', 'fernando.luna@gmail.com', 'isabel.mercado@yahoo.com',
        'gonzalo.tapia@gmail.com', 'raquel.silva@outlook.com', 'hector.prado@gmail.com',
        'monica.vera@yahoo.com', 'andres.reyes@gmail.com', 'claudia.paz@outlook.com',
        'eduardo.roca@gmail.com', 'silvia.mansilla@yahoo.com', 'pedro.quispe@gmail.com',
        'rosa.barrionuevo@outlook.com', 'miguel.rios@gmail.com'
      ];
      
      const telefonos = [
        '999872638', '988765432', '977654321', '966543210', '955432109',
        '944321098', '933210987', '922109876', '911098765', '900987654',
        '989876543', '978765432', '967654321', '956543210', '945432109',
        '934321098', '923210987', '912109876', '901098765', '990987654'
      ];
      
      let estado = 'Activo';
      if (i % 5 === 2) estado = 'Inactivo';
      if (i % 7 === 3) estado = 'Bloqueado';
      
      return {
        fecha: `0${(i % 28) + 1}/0${(i % 12) + 1}/2026`,
        nombre: nombres[i % nombres.length],
        doc: docs[i % docs.length],
        cel: telefonos[i % telefonos.length],
        correo: correos[i % correos.length],
        estado: estado,
      };
    });

  // Clientes filtrados (los que se muestran en la tabla)
  get clientesFiltrados() {
    let resultado = [...this.clientesOriginales];
    
    // Filtro por estado
    if (this.filtros.estado) {
      resultado = resultado.filter(cliente => cliente.estado === this.filtros.estado);
    }
    
    // Filtro por búsqueda
    if (this.busqueda && this.busqueda.trim().length > 0) {
      const busquedaLower = this.busqueda.toLowerCase().trim();
      resultado = resultado.filter(cliente =>
        cliente.nombre.toLowerCase().includes(busquedaLower) ||
        cliente.doc.includes(busquedaLower) ||
        cliente.cel.includes(busquedaLower) ||
        cliente.correo.toLowerCase().includes(busquedaLower)
      );
    }
    
    return resultado;
  }

  getEstadoStyle(estado: string) {
    if (estado === 'Activo') return 'bg-emerald-100 text-emerald-600';
    if (estado === 'Inactivo') return 'bg-slate-200 text-slate-500';
    if (estado === 'Bloqueado') return 'bg-pink-100 text-pink-500';
    return '';
  }

  onSearch(event: any) {
    if (this.busqueda.length > 0) {
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 500);
    } else {
      this.cargando = false;
    }
  }

  // Filtros
  filtros: any = {
    perfil: '',
    tratamiento: '',
    estado: '',
  };

  seleccionarUnico(grupo: string, valor: string) {
    this.filtros[grupo as keyof typeof this.filtros] =
      this.filtros[grupo as keyof typeof this.filtros] === valor ? '' : valor;
    
    // Mostrar loading al cambiar filtros
    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 300);
  }

  // Limpiar todos los filtros
  limpiarFiltros() {
    this.filtros = {
      perfil: '',
      tratamiento: '',
      estado: '',
    };
    this.busqueda = '';
    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 300);
    this.mostrarFiltros = false;
  }
}