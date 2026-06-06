// src/app/interfaces/clienteDetalle.interface.ts

export interface ClienteDetalle {
  CodigoUnico: string;
  NombreCompleto: string;
  Correo: string;
  TipoDocumento: string;
  NumeroDocumento: string;
  Telefono: string;
  EstadoCivil: string;
  LugarNacimiento: string;
  GradoInstruccion: string;
  Ocupacion: string;
  Puesto: string;
  Departamento: string;
  Distrito: string;
  NroDepartamento: string;
  TratamientoDatos: string;
  Sexo: string;
  FechaNacimiento: string;
  Nacionalidad: string;
  TipoTrabajo: string;
  RazonSocial: string;
  Antiguedad: string;
  Provincia: string;
  Direccion: string;
  Urbanizacion: string;
  PerfilTolerancia: PerfilTolerancia[];
  Dependientes: Dependiente[];
}

export interface PerfilTolerancia {
  Perfil: string;
}

export interface Dependiente {
  TipoDocumento: string;
  NumeroDocumento: string;
  NombresApellidos: string;
  VinculacionDescripcion: string;
  Nacionalidad: string;
  Regimen: string;
}