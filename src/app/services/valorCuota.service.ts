import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValorCuotaRequest, ValorCuotaResponse } from '../interfaces/valorCuota.interface';

@Injectable({
  providedIn: 'root',
})
export class ValorCuotaService {
  // ← Asegúrate que se llame así
  private apiUrl = 'https://dev-gateway-prudential.dev.localhost:57078/api/v1';

  constructor(private http: HttpClient) {}

  obtenerValorCuota(request: ValorCuotaRequest): Observable<ValorCuotaResponse> {
    return this.http.post<ValorCuotaResponse>(`${this.apiUrl}/fondos/valor-cuota`, request);
  }
}
