import { Injectable } from '@angular/core';
import { AtomDataLayoutIntl } from '@atomchat-io/ui-design-system';
import {
  faFolderOpen,
  faMagnifyingGlass,
  faTriangleExclamation,
} from '@fortawesome/pro-regular-svg-icons';

/** Spanish copy for empty / no-data / error fallbacks via `AtomDataLayoutIntl`. */
@Injectable()
export class SpanishDataLayoutIntl extends AtomDataLayoutIntl {
  override emptyStateTitle = 'Aún no hay registros';
  override emptyStateDescription = 'Crea el primer usuario para empezar.';
  override emptyStateIcon = faFolderOpen;

  override noDataTitle = 'Sin coincidencias';
  override noDataDescription = 'Ningún registro coincide con la búsqueda o los filtros.';
  override noDataIcon = faMagnifyingGlass;

  override errorTitle = 'Error al cargar';
  override errorDescription = 'No se pudieron obtener los datos. Intenta de nuevo.';
  override errorIcon = faTriangleExclamation;
}

export const SPANISH_DATA_LAYOUT_INTL_PROVIDER = {
  provide: AtomDataLayoutIntl,
  useClass: SpanishDataLayoutIntl,
} as const;
