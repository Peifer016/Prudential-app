import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValorCuotaService } from '../../../../services/valorCuota.service';
import { ValorCuotaRequest, ValorCuotaResponse } from '../../../../interfaces/valorCuota.interface';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit, AfterViewInit {
  @ViewChild('cuotaChart') cuotaChart!: ElementRef;
  viewMode: 'listado' | 'grafico' = 'listado';
  chart: any;

  // Datos desde la API
  valorCuota: ValorCuotaResponse | null = null;
  loading: boolean = true;
  error: string = '';

  // Parámetros recibidos del componente Fondos
  codFondo: string = '';
  codAdministradora: string = '';
  codFondoSerie: string = '';

  anios = ['2026', '2025', '2024'];
  meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Datos para la tabla
  datosCuota: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private valorCuotaService: ValorCuotaService,
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.codFondo = params['codFondo'] || '';
      this.codAdministradora = params['codAdministradora'] || '';
      this.codFondoSerie = params['codFondoSerie'] || '';

      if (this.codFondo) {
        this.cargarValorCuota();
      } else {
        this.loading = false;
        this.error = 'No se recibieron parámetros del fondo';
      }
    });
  }

  cargarValorCuota(): void {
    this.loading = true;
    this.valorCuotaService
      .obtenerValorCuota({
        codFondo: this.codFondo,
        codAdministradora: this.codAdministradora,
        codFondoSerie: this.codFondoSerie,
      })
      .subscribe({
        next: (response: ValorCuotaResponse) => {
          this.valorCuota = response;
          this.datosCuota = [
            {
              fecha: this.formatearFecha(response.FechaCuota),
              valorCuota: response.ValorCuotaInicial,
              valorCuotaNominal: response.ValorCuotaNominal,
              moneda: this.getNombreMoneda(response.CodMoneda),
              simbolo: this.getSimboloMoneda(response.CodMoneda),
            },
          ];
          this.loading = false;
          console.log('Valor cuota cargado:', response);
        },
        error: (err: any) => {
          console.error('Error al cargar valor cuota:', err);
          this.error = 'No se pudo cargar el valor cuota';
          this.loading = false;
        },
      });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  getNombreMoneda(codMoneda: string): string {
    const monedas: { [key: string]: string } = {
      '01': 'Soles (S/.)',
      '02': 'Dólares (US$)',
    };
    return monedas[codMoneda] || codMoneda;
  }

  getSimboloMoneda(codMoneda: string): string {
    const simbolos: { [key: string]: string } = {
      '01': 'S/.',
      '02': 'US$',
    };
    return simbolos[codMoneda] || '';
  }

  ngAfterViewInit(): void {
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

    let chartData = [15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8];
    let chartLabels = [
      '04-06-2025',
      '09-07-2025',
      '13-08-2025',
      '17-09-2025',
      '22-10-2025',
      '26-11-2025',
      '31-12-2025',
      '04-02-2026',
    ];

    if (this.valorCuota) {
      const fechaActual = this.formatearFecha(this.valorCuota.FechaCuota);
      chartLabels.unshift(fechaActual);
      chartData.unshift(this.valorCuota.ValorCuotaInicial);
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: `Fondo ${this.codFondo} - Serie ${this.codFondoSerie}`,
            data: chartData,
            borderColor: '#0070c0',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          y: {
            ticks: { stepSize: 1 },
            title: { display: true, text: 'Valor Cuota' },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }
}
