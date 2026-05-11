import { Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { FondosComponent } from './pages/fondos/fondos.component';

export const CLIENTES_ROUTES: Routes = [
  { path: 'listado', component: ListadoComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'inversiones', component: InversionesComponent },
  { path: 'fondos', component: FondosComponent },
  { path: '', redirectTo: 'listado', pathMatch: 'full' },
];
