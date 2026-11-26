import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LecturaState } from './lectura.reducer';

export const selectLecturaState = createFeatureSelector<LecturaState>('lectura');

export const selectListaLeerAhora = createSelector(
  selectLecturaState,
  (state: LecturaState) => state.listaLeerAhora
);
