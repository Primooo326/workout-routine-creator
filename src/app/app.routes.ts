import { Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { MakerComponent } from './pages/maker/maker.component';

export const routes: Routes = [
  { component: FormularioComponent, path: 'formulario' },
  {component: MakerComponent, path: 'maker'},
  { path: '**', redirectTo: 'formulario' }

];
