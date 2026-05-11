import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements AfterViewInit {
  @ViewChild('cuotaChart') cuotaChart!: ElementRef;
  viewMode: 'listado' | 'grafico' = 'listado';
  chart: any;

  anios = ['2026', '2025', '2024'];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

  datosCuota = [
    { fecha: '01/03/2026', f0: 'S/ 15.8822959', f1: 'S/ 24.0238780', f2: 'S/ 27.7440155', f3: 'S/ 30.9593428' },
    { fecha: '02/03/2026', f0: 'S/ 15.8884696', f1: 'S/ 23.9757003', f2: 'S/ 27.7398559', f3: 'S/ 31.0085295' },
    { fecha: '03/03/2026', f0: 'S/ 15.8905394', f1: 'S/ 23.7768893', f2: 'S/ 27.2242887', f3: 'S/ 29.9283997' },
    { fecha: '04/03/2026', f0: 'S/ 15.8926581', f1: 'S/ 23.7730251', f2: 'S/ 27.2883793', f3: 'S/ 30.1005378' },
    { fecha: '05/03/2026', f0: 'S/ 15.8945066', f1: 'S/ 23.6920818', f2: 'S/ 27.0039824', f3: 'S/ 29.5524629' },
  ];

  ngAfterViewInit(): void {
    // Inicializar gráfico después de la vista
    if (this.viewMode === 'grafico') {
      setTimeout(() => this.initChart(), 100);
    }
  }

  changeView(mode: 'listado' | 'grafico') {
    this.viewMode = mode;
    if (mode === 'grafico') {
      setTimeout(() => this.initChart(), 100);
    }
  }

  async initChart() {
    // Importar dinámicamente chart.js solo cuando se necesita
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    if (!this.cuotaChart || !this.cuotaChart.nativeElement) {
      return;
    }

    const ctx = this.cuotaChart.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['04-06-2025', '09-07-2025', '13-08-2025', '17-09-2025', '22-10-2025', '26-11-2025', '31-12-2025', '04-02-2026'],
        datasets: [
          {
            label: 'Fondo 0',
            data: [15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8],
            borderColor: '#0070c0',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: 'Fondo 1',
            data: [21.0, 21.5, 21.2, 22.0, 22.1, 22.3, 23.0, 23.4],
            borderColor: '#34445c',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: 'Fondo 2',
            data: [21.8, 22.5, 22.8, 24.0, 23.5, 24.5, 27.0, 26.2],
            borderColor: '#7cb5ec',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: 'Fondo 3',
            data: [21.5, 22.2, 24.5, 24.8, 24.6, 26.8, 30.5, 28.0],
            borderColor: '#e30613',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          y: { min: 14, max: 32, ticks: { stepSize: 2 } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}