import { lecturaReducer, initialLecturaState, LecturaState } from '../app/store/lectura.reducer';
import { leerAhora, quitarDeLeerAhora, limpiarLecturas } from '../app/store/lectura.actions';
import { Articulo } from '../app/models/articulo.model';

describe('Suite de Pruebas Jasmine: lecturaReducer (Redux)', () => {
  const articuloPrueba: Articulo = {
    id: 101,
    titulo: 'Notificaciones Push con Firebase Cloud Messaging',
    categoria: 'Capacidades Nativas',
    autor: 'Juan José Caro',
    resumen: 'Integración de FCM con obtención de token y recepción en primer plano.'
  };

  const segundoArticulo: Articulo = {
    id: 102,
    titulo: 'Geolocalización y Google Maps SDK',
    categoria: 'Mapas',
    autor: 'Juan José Caro',
    resumen: 'Renderizado de mapas nativos y marcadores personalizados.'
  };

  it('debe retornar el estado inicial cuando recibe una acción desconocida', () => {
    const accionDesconocida = { type: '[Test] Accion Desconocida' } as any;
    const estadoResultante: LecturaState = lecturaReducer(undefined, accionDesconocida);

    expect(estadoResultante).toEqual(initialLecturaState);
    expect(estadoResultante.listaLeerAhora.length).toBe(0);
  });

  it('debe agregar un artículo al estado al despachar la acción leerAhora', () => {
    const accion = leerAhora({ articulo: articuloPrueba });
    const nuevoEstado = lecturaReducer(initialLecturaState, accion);

    expect(nuevoEstado.listaLeerAhora.length).toBe(1);
    expect(nuevoEstado.listaLeerAhora[0]).toEqual(articuloPrueba);
  });

  it('no debe duplicar un artículo que ya existe en listaLeerAhora', () => {
    const estadoConUno: LecturaState = { listaLeerAhora: [articuloPrueba] };
    const accionDuplicada = leerAhora({ articulo: articuloPrueba });
    const estadoResultante = lecturaReducer(estadoConUno, accionDuplicada);

    expect(estadoResultante.listaLeerAhora.length).toBe(1);
  });

  it('debe eliminar un artículo específico al despachar quitarDeLeerAhora y vaciar con limpiarLecturas', () => {
    const estadoConDos: LecturaState = {
      listaLeerAhora: [articuloPrueba, segundoArticulo]
    };

    const estadoTrasQuitar = lecturaReducer(estadoConDos, quitarDeLeerAhora({ id: 101 }));
    expect(estadoTrasQuitar.listaLeerAhora.length).toBe(1);
    expect(estadoTrasQuitar.listaLeerAhora[0].id).toBe(102);

    const estadoLimpio = lecturaReducer(estadoTrasQuitar, limpiarLecturas());
    expect(estadoLimpio.listaLeerAhora.length).toBe(0);
  });
});
