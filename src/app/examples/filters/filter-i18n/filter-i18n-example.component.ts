import { Component } from '@angular/core';
import {
  AtomFilterCategoryDirective,
  AtomFilterComponent,
  AtomListItemComponent,
  AtomSelectPanelComponent,
  AtomSelectValueDirective,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { STATUS_OPTIONS } from '../shared/filter-demo.data';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';
import { FilterI18nEsDemoComponent } from './filter-i18n-es-demo.component';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-i18n')!;

@Component({
  selector: 'app-filter-i18n-example',
  imports: [
    ExamplePageComponent,
    AtomFilterComponent,
    AtomFilterCategoryDirective,
    AtomListItemComponent,
    AtomSelectPanelComponent,
    AtomSelectValueDirective,
    FilterI18nEsDemoComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="filter-i18n-compare">
        <section class="filter-i18n-compare__block">
          <h3 class="typography-body-bold">English (defaults)</h3>
          <atom-filter label="Filters">
            <atom-list-item label="Status" [atomFilterCategory]="statusEn">Status</atom-list-item>
          </atom-filter>
        </section>

        <section class="filter-i18n-compare__block">
          <h3 class="typography-body-bold">Español (component providers)</h3>
          <app-filter-i18n-es-demo />
        </section>
      </div>

      <pre class="filter-state-readout mt-l">{{ tokenDoc }}</pre>
    </app-example-page>

    <ng-template #statusEn>
      <atom-select-panel renderInline [multiple]="true">
        @for (opt of statusOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterI18nExampleComponent {
  protected readonly meta = meta;
  protected readonly statusOptions = STATUS_OPTIONS;

  protected readonly tokenDoc = `// app.config.ts — global i18n
providers: [
  {
    provide: ATOM_FILTER_ROW_LABELS,
    useValue: {
      cleanFiltersButton: 'Limpiar filtros',
      rowAriaLabel: 'Filtros aplicados',
      triggerAriaLabel: 'Abrir filtros',
      triggerLabel: 'Filtros',
    },
  },
  {
    provide: ATOM_FILTER_PANEL_CONFIG,
    useValue: {
      clearAllLabel: 'Limpiar todo',
      clearCategoryLabel: 'Limpiar categoría',
      countPattern: '{selected} de {total}',
      categoriesLabel: 'Categorías de filtro',
      dialogLabel: 'Filtros',
    },
  },
]

// Per-instance overrides on atom-filter-panel:
// [clearAllLabel] [clearCategoryLabel] [countPattern]
// [categoriesLabel] [dialogLabel]

// Per chip (consumer-owned):
// removeAriaLabel, chipAriaLabel on atom-filter-chip`;
}
