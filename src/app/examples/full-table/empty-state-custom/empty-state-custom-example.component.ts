import { Component, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faRotateRight } from '@fortawesome/pro-solid-svg-icons';
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
import { ALL_FULL_TABLE_EXAMPLES } from '../shared/full-table-examples.catalog';
import {
  LAYOUT_STATE_DEMO_COLUMNS,
  layoutStateEmptyDataSource,
  trackLayoutStateRow,
} from '../shared/data-layout-state-demo.data';

const meta = ALL_FULL_TABLE_EXAMPLES.find((e) => e.id === 'empty-state-custom')!;

type LayoutBodyState = 'empty' | 'noData' | 'error';

@Component({
  selector: 'app-empty-state-custom-example',
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
          <atom-toolbar size="s" ariaLabel="Users">
            <atom-search-input expandable placeholder="Search users…" [debounce]="0" />
            <button atom-button="primary" atomToolbarRight type="button">
              <fa-icon [icon]="faPlus" atom-button-icon />
              Add user
            </button>
          </atom-toolbar>

          <table atom-table [atomTrackBy]="trackBy" [dataSource]="dataSource">
            <ng-container atomColumnDef="name">
              <th atomHeaderCell *atomHeaderCellDef>Name</th>
              <td atomCell *atomCellDef="let row">{{ row.name }}</td>
            </ng-container>
            <ng-container atomColumnDef="email">
              <th atomHeaderCell *atomHeaderCellDef>Email</th>
              <td atomCell *atomCellDef="let row">{{ row.email }}</td>
            </ng-container>
            <tr atom-header-row *atomHeaderRowDef="columns"></tr>
            <tr atom-row *atomRowDef="let row; columns: columns"></tr>
          </table>

          <atom-pagination [length]="0" [pageSize]="10" />

          <ng-template atomDataLayoutState="empty">
            <div class="data-layout-custom-state">
              <span class="data-layout-custom-state__emoji" aria-hidden="true">📭</span>
              <p class="data-layout-custom-state__title typography-heading-bold fg-primary">
                Your team list is empty
              </p>
              <p class="data-layout-custom-state__text typography-caption-regular fg-secondary">
                Fully custom markup — no <code>atom-empty-state</code> component.
              </p>
              <button atom-button="primary" type="button">
                <fa-icon [icon]="faPlus" atom-button-icon />
                Add first user
              </button>
            </div>
          </ng-template>

          <ng-template atomDataLayoutState="noData">
            <div class="data-layout-custom-state">
              <span class="data-layout-custom-state__emoji" aria-hidden="true">🔍</span>
              <p class="data-layout-custom-state__title typography-heading-bold fg-primary">
                No matches for your filters
              </p>
              <p class="data-layout-custom-state__text typography-caption-regular fg-secondary">
                Build any layout with plain HTML inside <code>atomDataLayoutState</code>.
              </p>
            </div>
          </ng-template>

          <ng-template atomDataLayoutState="error">
            <div class="data-layout-custom-state">
              <span class="data-layout-custom-state__emoji" aria-hidden="true">⚠️</span>
              <p class="data-layout-custom-state__title typography-heading-bold fg-primary">
                Could not load users
              </p>
              <p class="data-layout-custom-state__text typography-caption-regular fg-secondary">
                Illustrations, emoji, or bespoke CTAs are valid custom overrides.
              </p>
              <button atom-button="secondary" type="button">
                <fa-icon [icon]="faRotateRight" atom-button-icon />
                Retry
              </button>
            </div>
          </ng-template>
        </atom-data-layout>
      </div>
    </app-example-page>
  `,
  styleUrls: ['../../table/shared/example-layout.scss', '../shared/full-table-layout.scss'],
})
export class EmptyStateCustomExampleComponent {
  protected readonly meta = meta;
  protected readonly dataSource = layoutStateEmptyDataSource;
  protected readonly trackBy = trackLayoutStateRow;
  protected readonly columns = [...LAYOUT_STATE_DEMO_COLUMNS];
  protected readonly faPlus = faPlus;
  protected readonly faRotateRight = faRotateRight;

  readonly previewState = signal<LayoutBodyState>('empty');

  onStateChange(value: string): void {
    this.previewState.set(value as LayoutBodyState);
  }
}
