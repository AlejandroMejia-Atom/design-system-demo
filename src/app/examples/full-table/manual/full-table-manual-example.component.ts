import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faTag, faTrashCan } from '@fortawesome/pro-solid-svg-icons';
import {
  ATOM_DATA_LAYOUT_IMPORTS,
  ATOM_TABLE_IMPORTS,
  AtomBulkActionBarComponent,
  AtomButtonComponent,
  AtomFilterCategoryDirective,
  AtomFilterComponent,
  AtomIconButtonComponent,
  AtomListItemComponent,
  AtomPaginationComponent,
  AtomSearchInputComponent,
  AtomSegmentComponent,
  AtomSegmentControlComponent,
  AtomSelectPanelComponent,
  AtomToolbarComponent,
  prependAtomTableSelectionColumn,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { BulkClearRefDirective } from '../shared/bulk-clear-ref.directive';
import { ALL_FULL_TABLE_EXAMPLES } from '../shared/full-table-examples.catalog';
import {
  ROLE_FILTER_ITEMS,
  STATUS_FILTER_ITEMS,
  USER_TABLE_COLUMNS,
  trackUserByEmail,
} from '../shared/user-table-demo.data';
import { UserTableDemoService } from '../shared/user-table-demo.service';

const meta = ALL_FULL_TABLE_EXAMPLES.find((e) => e.id === 'full-table-manual')!;

@Component({
  selector: 'app-full-table-manual-example',
  providers: [UserTableDemoService],
  imports: [
    ...ATOM_DATA_LAYOUT_IMPORTS,
    ...ATOM_TABLE_IMPORTS,
    AtomPaginationComponent,
    AtomToolbarComponent,
    AtomSearchInputComponent,
  AtomButtonComponent,
  AtomIconButtonComponent,
    AtomFilterComponent,
    AtomFilterCategoryDirective,
    AtomListItemComponent,
    AtomSelectPanelComponent,
    AtomBulkActionBarComponent,
    AtomSegmentControlComponent,
    AtomSegmentComponent,
    BulkClearRefDirective,
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
          Delete outcome:
          <atom-segment-control
            size="s"
            [value]="demo.deleteMode()"
            (valueChange)="demo.onDeleteModeChange($event)"
          >
            <atom-segment value="random">Random</atom-segment>
            <atom-segment value="success">Success</atom-segment>
            <atom-segment value="error">Error</atom-segment>
          </atom-segment-control>
        </div>

        <atom-data-layout [noData]="demo.hasNoResults()" class="full-table-layout-shell">
          <atom-toolbar size="s" ariaLabel="Users">
            <atom-search-input
              expandable
              placeholder="Search users…"
              [debounce]="0"
              (valueChange)="demo.onSearch($event)"
            />

            <atom-filter>
              <atom-list-item
                #roleCat
                [atomFilterCategory]="rolePanel"
                label="Role"
              />
              <atom-list-item
                #statusCat
                [atomFilterCategory]="statusPanel"
                label="Status"
              />
            </atom-filter>

            <button atom-button="primary" atomToolbarRight type="button">
              <fa-icon [icon]="faPlus" atom-button-icon />
              Add user
            </button>
          </atom-toolbar>

          <table
            atom-table
            [atomTrackBy]="trackBy"
            atomSelectable
            atomSelectionCheckboxes
            appBulkClearRef
            #clearRef="appBulkClearRef"
            [dataSource]="demo.dataSource"
            (atomSelectionChange)="demo.onSelectionChange($event)"
          >
            <atom-table-selection-column />

            <ng-container atomColumnDef="name">
              <th atomHeaderCell *atomHeaderCellDef>Name</th>
              <td atomCell *atomCellDef="let row">{{ row.name }}</td>
            </ng-container>
            <ng-container atomColumnDef="email">
              <th atomHeaderCell *atomHeaderCellDef>Email</th>
              <td atomCell *atomCellDef="let row">{{ row.email }}</td>
            </ng-container>
            <ng-container atomColumnDef="role">
              <th atomHeaderCell *atomHeaderCellDef>Role</th>
              <td atomCell *atomCellDef="let row">{{ row.role }}</td>
            </ng-container>
            <ng-container atomColumnDef="status">
              <th atomHeaderCell *atomHeaderCellDef>Status</th>
              <td atomCell *atomCellDef="let row">{{ row.status }}</td>
            </ng-container>
            <ng-container atomColumnDef="createdAt">
              <th atomHeaderCell *atomHeaderCellDef>Created</th>
              <td atomCell *atomCellDef="let row">{{ row.createdAt }}</td>
            </ng-container>

            <tr atom-header-row *atomHeaderRowDef="columns"></tr>
            <tr atom-row *atomRowDef="let row; columns: columns" [atomRowValue]="row"></tr>
          </table>

          <atom-pagination
            #paginator
            [length]="demo.filteredLength()"
            [pageSize]="10"
          />
        </atom-data-layout>

        @if (demo.selectedCount() > 0) {
          <atom-bulk-action-bar
            [count]="demo.selectedCount()"
            (dismissed)="demo.clearManualSelection(clearRef)"
          >
            <button
              atom-icon-button="primary"
              size="s"
              type="button"
              [icon]="faTag"
              ariaLabel="Tag selected"
            ></button>
            <button
              atom-icon-button="tertiary"
              size="s"
              type="button"
              color="destructive"
              [icon]="faTrashCan"
              ariaLabel="Delete selected"
              [disabled]="demo.isDeleting()"
              (click)="demo.deleteSelected(clearRef)"
            ></button>
          </atom-bulk-action-bar>
        }

        <ng-template #rolePanel>
          <atom-select-panel renderInline [items]="roleItems" />
        </ng-template>

        <ng-template #statusPanel>
          <atom-select-panel renderInline [items]="statusItems" />
        </ng-template>
      </div>
    </app-example-page>
  `,
  styleUrls: ['../../table/shared/example-layout.scss', '../shared/full-table-layout.scss'],
})
export class FullTableManualExampleComponent {
  protected readonly meta = meta;
  protected readonly demo = inject(UserTableDemoService);
  protected readonly trackBy = trackUserByEmail;
  protected readonly columns = prependAtomTableSelectionColumn([...USER_TABLE_COLUMNS]);
  protected readonly roleItems = ROLE_FILTER_ITEMS;
  protected readonly statusItems = STATUS_FILTER_ITEMS;
  protected readonly faPlus = faPlus;
  protected readonly faTag = faTag;
  protected readonly faTrashCan = faTrashCan;

  private readonly paginator = viewChild.required<AtomPaginationComponent>('paginator');
  private readonly _roleCategory = viewChild('roleCat', {
    read: AtomFilterCategoryDirective,
  });
  private readonly _statusCategory = viewChild('statusCat', {
    read: AtomFilterCategoryDirective,
  });

  private readonly roleSelections = computed(
    () => this._roleCategory()?.selectedLabels() ?? [],
  );
  private readonly statusSelections = computed(
    () => this._statusCategory()?.selectedLabels() ?? [],
  );

  constructor() {
    afterNextRender(() => {
      this.demo.dataSource.atomPaginator = this.paginator();
    });

    effect(() => {
      this.demo.syncFilterSelections(this.roleSelections(), this.statusSelections());
    });
  }
}
