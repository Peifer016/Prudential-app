import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-inversiones',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './inversiones.component.html',
})
export class InversionesComponent implements OnInit, AfterViewInit {
  loading: boolean = true;

  // Nuevas variables para la cabecera
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
    { label: 'Rendimiento mensual', value: '-4.5%', color: 'text-gray-400' },
    { label: 'Rendimiento anual', value: '+8.2%', color: 'text-green-500' },
    { label: 'Desde inicio', value: '+15.3%', color: 'text-green-500' },
    { label: 'Periodo seleccionado', value: '+7.1%', color: 'text-green-500' },
  ];

  // 1. GRÁFICO DE BARRAS APILADAS (Stacked Bar Chart)
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5'],
    datasets: [
      {
        data: [100000, 82000, 81000, 72000, 83000],
        backgroundColor: '#93c5fd',
        stack: 'A',
        categoryPercentage: 0.6,
        barPercentage: 0.9,
      },
      {
        data: [2000, 3500, 4000, 3800, 5000],
        backgroundColor: '#3b3191',
        stack: 'A',
        categoryPercentage: 0.6,
        barPercentage: 0.9,
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#9ca3af', font: { size: 11 } },
      },
      y: {
        stacked: true,
        grid: { color: '#f3f4f6' },
        border: { display: false },
        ticks: { color: '#9ca3af', font: { size: 11 }, callback: (v) => v.toLocaleString() },
      },
    },
  };

  // 2. GRÁFICO DE ÁREA (Area Chart)
  public areaChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5'],
    datasets: [
      {
        data: [110000, 95000, 95000, 88000, 98000],
        label: 'Saldo actual',
        borderColor: '#f97316',
        borderWidth: 2,
        fill: true,
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        tension: 0.4,
        pointRadius: 0,
      },
      {
        data: [112000, 95000, 95000, 88000, 98000],
        label: 'Suscripción neta',
        borderColor: '#0e1b3d',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  public areaChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af', font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { color: '#f3f4f6' },
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  // 3. GRÁFICOS DE DONA (Pie Charts)
  public fondoData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Fondo A', 'Fondo B', 'Fondo C', 'Fondo D', 'Fondo E'],
    datasets: [
      {
        data: [75, 10, 8, 5, 2],
        backgroundColor: ['#0e1b3d', '#0070c0', '#22d3ee', '#facc15', '#a855f7'],
        borderWidth: 0,
      },
    ],
  };

  public monedaData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Dólares', 'Soles'],
    datasets: [
      {
        data: [90, 10],
        backgroundColor: ['#0e1b3d', '#22d3ee'],
        borderWidth: 0,
      },
    ],
  };

  public activoData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Renta Variable', 'Renta Fija', 'Otros'],
    datasets: [
      {
        data: [50, 40, 10],
        backgroundColor: ['#f97316', '#22c55e', '#ff0055'],
        borderWidth: 0,
      },
    ],
  };

  public pieOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1200);
  }

  ngAfterViewInit(): void {
    // Asegurar que los gráficos se renderizan correctamente
    setTimeout(() => {
      // Forzar actualización de los gráficos si es necesario
      this.barChartData = { ...this.barChartData };
      this.areaChartData = { ...this.areaChartData };
      this.fondoData = { ...this.fondoData };
      this.monedaData = { ...this.monedaData };
      this.activoData = { ...this.activoData };
    }, 100);
  }

  descargarEECC(): void {
    console.log('Descargando...');
  }
  
  guardarImagen(id: string): void {
    console.log('Guardando imagen de:', id);
  }
}