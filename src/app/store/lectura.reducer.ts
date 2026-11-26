import { createReducer, on } from '@ngrx/store';
import { Articulo } from '../models/articulo.model';
import { leerAhora, limpiarLecturas, quitarDeLeerAhora } from './lectura.actions';

export interface LecturaState {
  listaLeerAhora: Articulo[];
}

export const initialLecturaState: LecturaState = {
  listaLeerAhora: []
};

export const lecturaReducer = createReducer(
  initialLecturaState,
  on(leerAhora, (state, { articulo }) => {
    const yaExiste = state.listaLeerAhora.some((item) => item.id === articulo.id);
    if (yaExiste) {
      return state;
    }
    return {
      ...state,
      listaLeerAhora: [articulo, ...state.listaLeerAhora]
    };
  }),
  on(quitarDeLeerAhora, (state, { id }) => ({
    ...state,
    listaLeerAhora: state.listaLeerAhora.filter((item) => item.id !== id)
  })),
  on(limpiarLecturas, (state) => ({
    ...state,
    listaLeerAhora: []
  }))
);
