// src/app/services/fondos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FondosResponse } from '../interfaces/fondoListado.interface';

@Injectable({
  providedIn: 'root',
})
export class FondosService {
  private apiUrl = 'https://dev-gateway-prudential.dev.localhost:57078/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Listar todos los fondos
   */
  listarFondos(): Observable<FondosResponse> {
    return this.http.get<FondosResponse>(`${this.apiUrl}/fondos/listar`);
  }
}