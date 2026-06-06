// src/app/interfaces/fondo.interface.ts

export interface FondosResponse {
  Fondos: Fondo[];
}

export interface Fondo {
  CodFondo: string;
  CodAdministradora: string;
  DescripFondo: string;
  NumRucFondo: string;
  CodFondoSerie: string;
  DescripFondoSerie: string;
  Moneda: string;
  CodCategoria: string;
  TasaComisionRescate: number;
  AplicaValidacionParticipacion: string;
  MontoMinRedencion: number;
  MontoMinSaldoMantener: number;
  MontoMinSuscripcion: number;
  MontoMinSuscripcionInicial: number;
  PorcenMaxParticipe: number;
  MontoMaxParticipe: number;
  PorcenMaxParticipeVinculado: number;
  MontoMaxParticipeVinculado: number;
}