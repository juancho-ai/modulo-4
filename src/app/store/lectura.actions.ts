import { createAction, props } from '@ngrx/store';
import { Articulo } from '../models/articulo.model';

export const leerAhora = createAction(
  '[Favoritos] Leer Ahora',
  props<{ articulo: Articulo }>()
);

export const quitarDeLeerAhora = createAction(
  '[Home] Quitar de Leer Ahora',
  props<{ id: number }>()
);

export const limpiarLecturas = createAction('[Home] Limpiar Lecturas');
