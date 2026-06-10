import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  TemplateRef,
  viewChild,
  type AfterViewInit,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faTag, faTrashCan } from '@fortawesome/pro-solid-svg-icons';
import {
  ATOM_DATA_LAYOUT_IMPORTS,
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
  AtomTagComponent,
  AtomToolbarComponent,
  type AtomCellContext,
  type AtomTableColumn,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { ALL_FULL_TABLE_EXAMPLES } from '../shared/full-table-examples.catalog';
import { TABLE_BUILDER_DEMO_IMPORTS } from '../shared/table-builder.imports';
import {
  BUILDER_COLUMNS,
  ROLE_FILTER_ITEMS,
  STATUS_FILTER_ITEMS,
  trackUserByEmail,
  type UserRow,
} from '../shared/user-table-demo.data';
import { UserTableDemoService } from '../shared/user-table-demo.service';

const meta = ALL_FULL_TABLE_EXAMPLES.find((e) => e.id === 'full-table-builder')!;

@Component({
  selector: 'app-full-table-builder-example',
  providers: [UserTableDemoService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ...ATOM_DATA_LAYOUT_IMPORTS,
    ...TABLE_BUILDER_DEMO_IMPORTS,
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
    AtomTagComponent,
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

          <atom-table-builder
            [columns]="columns()"
            [dataSource]="demo.dataSource"
            [atomTrackBy]="trackBy"
            [selectable]="true"
            [multiple]="true"
            (selectionChange)="demo.onSelectionChange($event)"
          />

          <atom-pagination
            #paginator
            [length]="demo.filteredLength()"
            [pageSize]="10"
          />
        </atom-data-layout>

        @if (demo.selectedCount() > 0) {
          <atom-bulk-action-bar
            [count]="demo.selectedCount()"
            (dismissed)="demo.clearBuilderSelection()"
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
              (click)="demo.deleteSelected()"
            ></button>
          </atom-bulk-action-bar>
        }

        <ng-template #statusTpl let-value="value">
          <span atomTag [intent]="value === 'Active' ? 'success' : 'neutral'">{{ value }}</span>
        </ng-template>

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
export class FullTableBuilderExampleComponent implements AfterViewInit {
  protected readonly meta = meta;
  protected readonly demo = inject(UserTableDemoService);
  protected readonly trackBy = trackUserByEmail;
  protected readonly roleItems = ROLE_FILTER_ITEMS;
  protected readonly statusItems = STATUS_FILTER_ITEMS;
  protected readonly faPlus = faPlus;
  protected readonly faTag = faTag;
  protected readonly faTrashCan = faTrashCan;

  private readonly _statusTpl =
    viewChild<TemplateRef<AtomCellContext<UserRow>>>('statusTpl');
  private readonly _columns = signal<AtomTableColumn<UserRow>[]>([...BUILDER_COLUMNS]);
  protected readonly columns = this._columns.asReadonly();

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
      this._applyStatusCellTpl();
    });

    effect(() => {
      this.demo.syncFilterSelections(this.roleSelections(), this.statusSelections());
    });
  }

  ngAfterViewInit(): void {
    this._applyStatusCellTpl();
  }

  private _applyStatusCellTpl(): void {
    const statusTpl = this._statusTpl();
    if (!statusTpl) {
      return;
    }

    this._columns.set(
      BUILDER_COLUMNS.map((column) =>
        column.columnName === 'status' ? { ...column, cellTpl: statusTpl } : column,
      ),
    );
  }
}
