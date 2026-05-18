import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ValorCuota {
  id: number;
  fondo: string;
  valor: number;
  fecha: Date;
  variacion?: number;
  // Agregar más propiedades según tu modelo
}

@Injectable({
  providedIn: 'root',
})
export class ValorCuotaService {
  private apiUrl = 'https://tu-api-backend.com/api'; // Cambiar por tu URL real

  constructor(private http: HttpClient) {}

  // Obtener valores de cuota
  getValoresCuota(): Observable<ValorCuota[]> {
    return this.http.get<ValorCuota[]>(`${this.apiUrl}/valor-cuota`);
  }

  // Obtener valor de cuota por ID
  getValorCuota(id: number): Observable<ValorCuota> {
    return this.http.get<ValorCuota>(`${this.apiUrl}/valor-cuota/${id}`);
  }

  // Obtener valores por fondo específico
  getValoresPorFondo(fondoId: string): Observable<ValorCuota[]> {
    return this.http.get<ValorCuota[]>(`${this.apiUrl}/valor-cuota/fondo/${fondoId}`);
  }

  // Obtener último valor de cuota
  getUltimoValor(): Observable<ValorCuota> {
    return this.http.get<ValorCuota>(`${this.apiUrl}/valor-cuota/ultimo`);
  }
}
