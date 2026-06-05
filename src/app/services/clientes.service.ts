// src/app/services/clientes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDetalle } from '../interfaces/clienteDetalle.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  // ✅ Volvemos a la URL completa original
  private apiUrl = 'https://dev-gateway-prudential.dev.localhost:57078/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Buscar cliente por tipo y número de documento
   */
  buscarCliente(tipoDocumento: string, numeroDocumento: string): Observable<ClienteDetalle> {
    return this.http.get<ClienteDetalle>(
      `${this.apiUrl}/clientes/buscar/${tipoDocumento}/${numeroDocumento}`,
    );
  }
}
