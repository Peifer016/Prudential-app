export interface ValorCuotaRequest {
  codFondo: string;
  codAdministradora: string;
  codFondoSerie: string;
}

export interface ValorCuotaResponse {
  ValorCuotaInicial: number;
  FechaCuota: string;
  CodMoneda: string;
  ValorTipoCambio: number;
  CantCuotaInicio: number;
  CantCuotaInicioPagada: number;
  ValorCuotaInicialReal: number;
  ValorCuotaNominal: number;
  TipoFondo: string;
  IndSerieMultiple: string;
  CodPlanContable: string;
  MontoPatrimonioInicial: number;
}