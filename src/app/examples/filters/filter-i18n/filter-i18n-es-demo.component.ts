import { Component } from '@angular/core';
import {
  ATOM_FILTER_PANEL_CONFIG,
  ATOM_FILTER_PANEL_DEFAULT_CONFIG,
  ATOM_FILTER_ROW_DEFAULT_LABELS,
  ATOM_FILTER_ROW_LABELS,
  AtomFilterCategoryDirective,
  AtomFilterComponent,
  AtomListItemComponent,
  AtomSelectPanelComponent,
  AtomSelectValueDirective,
} from '@atomchat-io/ui-design-system';

import { STATUS_OPTIONS } from '../shared/filter-demo.data';

const ES_ROW_LABELS = {
  ...ATOM_FILTER_ROW_DEFAULT_LABELS,
  cleanFiltersButton: 'Limpiar filtros',
  rowAriaLabel: 'Filtros aplicados',
  triggerAriaLabel: 'Abrir filtros',
  triggerLabel: 'Filtros',
};

const ES_PANEL_CONFIG = {
  ...ATOM_FILTER_PANEL_DEFAULT_CONFIG,
  clearAllLabel: 'Limpiar todo',
  clearCategoryLabel: 'Limpiar categoría',
  countPattern: '{selected} de {total}',
  categoriesLabel: 'Categorías de filtro',
  dialogLabel: 'Filtros',
};

@Component({
  selector: 'app-filter-i18n-es-demo',
  imports: [
    AtomFilterComponent,
    AtomFilterCategoryDirective,
    AtomListItemComponent,
    AtomSelectPanelComponent,
    AtomSelectValueDirective,
  ],
  providers: [
    { provide: ATOM_FILTER_ROW_LABELS, useValue: ES_ROW_LABELS },
    { provide: ATOM_FILTER_PANEL_CONFIG, useValue: ES_PANEL_CONFIG },
  ],
  template: `
    <atom-filter>
      <atom-list-item label="Estado" [atomFilterCategory]="statusEs">Estado</atom-list-item>
    </atom-filter>

    <ng-template #statusEs>
      <atom-select-panel renderInline [multiple]="true">
        @for (opt of statusOptionsEs; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>
  `,
})
export class FilterI18nEsDemoComponent {
  protected readonly statusOptionsEs = STATUS_OPTIONS.map((o) => ({
    ...o,
    label:
      o.value === 'open'
        ? 'Abierto'
        : o.value === 'in_progress'
          ? 'En progreso'
          : o.value === 'resolved'
            ? 'Resuelto'
            : 'Cerrado',
  }));
}
