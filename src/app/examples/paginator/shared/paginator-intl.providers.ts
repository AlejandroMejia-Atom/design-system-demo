import { Injectable } from '@angular/core';

import { AtomPaginatorIntl } from '@atomchat-io/ui-design-system';

@Injectable()
export class SpanishPaginatorIntl extends AtomPaginatorIntl {
  override itemsPerPageLabel = 'Registros por página';
  override firstPageLabel = 'Primera página';
  override previousPageLabel = 'Página anterior';
  override nextPageLabel = 'Página siguiente';
  override lastPageLabel = 'Última página';

  override getRangeLabel(pageIndex: number, pageSize: number, length: number): string {
    if (length === 0) {
      return '0 de 0';
    }
    const totalPages = Math.max(1, Math.ceil(length / pageSize));
    return `Página ${pageIndex + 1} de ${totalPages}`;
  }
}

@Injectable()
export class ItemRangePaginatorIntl extends AtomPaginatorIntl {
  override getRangeLabel(pageIndex: number, pageSize: number, length: number): string {
    if (length === 0) {
      return '0 of 0';
    }
    const start = pageIndex * pageSize;
    const end = Math.min(start + pageSize, length);
    return `${start + 1} – ${end} of ${length}`;
  }
}
