import { Component, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import {
  ATOM_DATA_LAYOUT_IMPORTS,
  ATOM_TABLE_IMPORTS,
  AtomButtonComponent,
  AtomPaginationComponent,
  AtomSearchInputComponent,
  AtomSegmentComponent,
  AtomSegmentControlComponent,
  AtomToolbarComponent,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { SPANISH_DATA_LAYOUT_INTL_PROVIDER } from '../shared/data-layout-intl.providers';
import { ALL_FULL_TABLE_EXAMPLES } from '../shared/full-table-examples.catalog';
import {
  LAYOUT_STATE_DEMO_COLUMNS,
  layoutStateEmptyDataSource,
  trackLayoutStateRow,
} from '../shared/data-layout-state-demo.data';

const meta = ALL_FULL_TABLE_EXAMPLES.find((e) => e.id === 'empty-state-intl')!;

type LayoutBodyState = 'empty' | 'noData' | 'error';

@Component({
  selector: 'app-empty-state-intl-example',
  providers: [SPANISH_DATA_LAYOUT_INTL_PROVIDER],
  imports: [
    ...ATOM_DATA_LAYOUT_IMPORTS,
    ...ATOM_TABLE_IMPORTS,
    AtomPaginationComponent,
    AtomToolbarComponent,
    AtomSearchInputComponent,
    AtomButtonComponent,
    AtomSegmentControlComponent,
    AtomSegmentComponent,
    FaIconComponent,
    ExamplePageComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="full-table-demo">
        <div class="full-table-demo-controls typography-label-regular">
          Preview state:
          <atom-segment-control
            size="s"
            [value]="previewState()"
            (valueChange)="onStateChange($event)"
          >
            <atom-segment value="empty">Empty</atom-segment>
            <atom-segment value="noData">No data</atom-segment>
            <atom-segment value="error">Error</atom-segment>
          </atom-segment-control>
        </div>

        <atom-data-layout
          [empty]="previewState() === 'empty'"
          [noData]="previewState() === 'noData'"
          [error]="previewState() === 'error'"
          class="full-table-layout-shell"
        >
          <atom-toolbar size="s" ariaLabel="Usuarios">
            <atom-search-input expandable placeholder="Buscar usuarios…" [debounce]="0" />
            <button atom-button="primary" atomToolbarRight type="button">
              <fa-icon [icon]="faPlus" atom-button-icon />
              Agregar usuario
            </button>
          </atom-toolbar>

          <table atom-table [atomTrackBy]="trackBy" [dataSource]="dataSource">
            <ng-container atomColumnDef="name">
              <th atomHeaderCell *atomHeaderCellDef>Nombre</th>
              <td atomCell *atomCellDef="let row">{{ row.name }}</td>
            </ng-container>
            <ng-container atomColumnDef="email">
              <th atomHeaderCell *atomHeaderCellDef>Correo</th>
              <td atomCell *atomCellDef="let row">{{ row.email }}</td>
            </ng-container>
            <tr atom-header-row *atomHeaderRowDef="columns"></tr>
            <tr atom-row *atomRowDef="let row; columns: columns"></tr>
          </table>

          <atom-pagination [length]="0" [pageSize]="10" />
        </atom-data-layout>
      </div>
    </app-example-page>
  `,
  styleUrls: ['../../table/shared/example-layout.scss', '../shared/full-table-layout.scss'],
})
export class EmptyStateIntlExampleComponent {
  protected readonly meta = meta;
  protected readonly dataSource = layoutStateEmptyDataSource;
  protected readonly trackBy = trackLayoutStateRow;
  protected readonly columns = [...LAYOUT_STATE_DEMO_COLUMNS];
  protected readonly faPlus = faPlus;

  readonly previewState = signal<LayoutBodyState>('empty');

  onStateChange(value: string): void {
    this.previewState.set(value as LayoutBodyState);
  }
}
