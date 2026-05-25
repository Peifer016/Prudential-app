import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Router, RouterModule } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-inversiones',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterModule],
  templateUrl: './inversiones.component.html',
})
export class InversionesComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  loading: boolean = true;

  totalDolarizado: number = 2281539.03;
  totalSoles: number = 601.16;
  totalDolares: number = 2140352;

  cliente = {
    nombre: 'Luis Ramirez',
    contratoActivo: '# Contrato 123',
    fondoActivo: 'Fondo Nombre 2',
    fechaFiltro: '17/04/2026',
  };

  rendimientos = [
    { label: 'Rendimiento mensual', value: '-4.5%', color: 'text-red-500' },
    { label: 'Rendimiento anual', value: '+8.2%', color: 'text-green-500' },
    { label: 'Desde inicio', value: '+15.3%', color: 'text-green-500' },
    { label: 'Periodo seleccionado', value: '+7.1%', color: 'text-green-500' },
  ];

  fondosList = [
    { nombre: 'Prudential Estrategia Global USD', color: '#0e1b3d', porcentaje: 40 },
    { nombre: 'Prudential Renta Variable Global', color: '#0070c0', porcentaje: 25 },
    { nombre: 'Moneda Local', color: '#22d3ee', porcentaje: 15 },
    { nombre: 'Corto Plazo USD', color: '#facc15', porcentaje: 12 },
    { nombre: 'PMV', color: '#a855f7', porcentaje: 8 },
  ];

  monedasList = [
    { nombre: 'Dólares', color: '#0e1b3d', porcentaje: 94 },
    { nombre: 'Soles', color: '#22d3ee', porcentaje: 6 },
  ];

  activosList = [
    { nombre: 'Money Market', color: '#ff0055', porcentaje: 45 },
    { nombre: 'Renta Fija', color: '#f97316', porcentaje: 35 },
    { nombre: 'Renta Variable', color: '#22c55e', porcentaje: 20 },
  ];

  // --- GRÁFICO 1: BARRAS APILADAS ---
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5'],
    datasets: [
      {
        data: [84000, 78000, 81000, 79000, 88000],
        label: 'Suscripción neta',
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        stack: 'total',
        barPercentage: 0.4, // 👈 BARRAS MÁS DELGADAS
        categoryPercentage: 0.7, // 👈 ESPACIO ENTRE MESES
      },
      {
        data: [51000, 47000, 50000, 48000, 54000],
        label: 'Ganancias / pérdida acumulada',
        backgroundColor: '#8b5cf6',
        borderRadius: 4,
        stack: 'total',
        barPercentage: 0.4, // 👈 BARRAS MÁS DELGADAS
        categoryPercentage: 0.7, // 👈 ESPACIO ENTRE MESES
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { stacked: true, beginAtZero: true, grid: { color: '#f3f4f6' } },
    },
    plugins: { legend: { display: false } },
  };

  // --- GRÁFICO 2: SALDO Y SUSCRIPCIONES (IGUAL A LA IMAGEN) ---
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5'],
    datasets: [
      {
        data: [110000, 92000, 95000, 82000, 96000],
        label: 'Saldo actual',
        borderColor: '#0e1b3d', // Línea azul oscuro superior
        borderWidth: 3,
        fill: true, // Habilitamos el relleno para el gradiente
        tension: 0.2, // Suavizado leve
        pointRadius: 0, // Sin puntos para limpieza total
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { weight: 'bold' }, color: '#0e1b3d' },
      },
      y: {
        min: 0,
        max: 120000,
        ticks: { stepSize: 20000, color: '#94a3b8' },
        grid: { color: '#f3f4f6' },
      },
    },
    plugins: { legend: { display: false } },
  };

  // --- GRÁFICOS CIRCULARES ---
  public fondoData: ChartConfiguration<'pie'>['data'] = {
    labels: this.fondosList.map((f) => f.nombre),
    datasets: [
      {
        data: [40, 25, 15, 12, 8],
        backgroundColor: this.fondosList.map((f) => f.color),
        borderWidth: 0,
      },
    ],
  };

  public monedaData: ChartConfiguration<'pie'>['data'] = {
    labels: this.monedasList.map((m) => m.nombre),
    datasets: [
      { data: [94, 6], backgroundColor: this.monedasList.map((m) => m.color), borderWidth: 0 },
    ],
  };

  public activoData: ChartConfiguration<'pie'>['data'] = {
    labels: this.activosList.map((a) => a.nombre),
    datasets: [
      { data: [45, 35, 20], backgroundColor: this.activosList.map((a) => a.color), borderWidth: 0 },
    ],
  };

  public pieOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1200);
  }

  ngAfterViewInit(): void {
    // Aplicamos el gradiente al segundo gráfico una vez cargado
    setTimeout(() => {
      const chartCanvases = document.getElementsByTagName('canvas');
      if (chartCanvases.length > 1) {
        const ctx = chartCanvases[1].getContext('2d'); // Buscamos el segundo canvas (line)
        if (ctx) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, '#f97316'); // Naranja arriba
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparente abajo

          this.lineChartData.datasets[0].backgroundColor = gradient;

          // Trigger de actualización manual para que ng2-charts detecte el cambio de color
          this.lineChartData = { ...this.lineChartData };
        }
      }
    }, 1500);
  }

  descargarEECC(): void {
    console.log('Descargando...');
  }

  guardarImagen(id: string): void {
    console.log('Guardando:', id);
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
    // Lógica para cerrar el menú
    // Si tienes un menú lateral o móvil, puedes emitir un evento o cambiar una variable
    console.log('Menú cerrado desde InversionesComponent');
  }
}
