export interface ClienteListadoResponse {
  Codigo: string;
  TipoIdentidad: string;
  DescripTipoIdentidad: string;
  NumIdentidad: string;
  FechaRegistro: string;
  ListaClientesAsociados: ClienteAsociado[];
}

export interface ClienteAsociado {
  CodigoCliente: string;
  TipoIdentidad: string;
  DescripTipoIdentidad: string;
  NumIdentidad: string;
  NombreCompleto: string;
  FechaContrato: string;
  Email: string;
  Telefono: string;
}
