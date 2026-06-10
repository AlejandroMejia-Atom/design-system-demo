import { Injectable, computed, inject, signal } from '@angular/core';
import {
  AtomSnackbarService,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { USER_TABLE_DATA, type UserRow } from './user-table-demo.data';

export type DeleteMode = 'random' | 'success' | 'error';

export interface BulkClearRefLike {
  clear(): void;
}

@Injectable()
export class UserTableDemoService {
  private readonly snackbar = inject(AtomSnackbarService);

  readonly dataSource = new AtomTableDataSource([...USER_TABLE_DATA]);
  readonly filteredLength = signal(USER_TABLE_DATA.length);
  readonly hasNoResults = computed(() => this.filteredLength() === 0);

  readonly selectedCount = computed(() => this._selectedRows().length);
  readonly builderMountKey = signal(0);

  private readonly _searchValue = signal('');
  private readonly _roleSelections = signal<readonly string[]>([]);
  private readonly _statusSelections = signal<readonly string[]>([]);
  private readonly _selectedRows = signal<readonly UserRow[]>([]);
  private readonly _deleteMode = signal<DeleteMode>('random');
  private readonly _isDeleting = signal(false);

  readonly deleteMode = this._deleteMode.asReadonly();
  readonly isDeleting = this._isDeleting.asReadonly();

  constructor() {
    this.dataSource.filterPredicate = (row: UserRow, filter: string) => {
      try {
        const { search, roles, statuses } = JSON.parse(filter) as {
          search: string;
          roles: string[];
          statuses: string[];
        };
        const matchesSearch =
          !search ||
          row.name.toLowerCase().includes(search) ||
          row.email.toLowerCase().includes(search);
        const matchesRole = !roles.length || roles.includes(row.role);
        const matchesStatus = !statuses.length || statuses.includes(row.status);
        return matchesSearch && matchesRole && matchesStatus;
      } catch {
        return true;
      }
    };
  }

  syncFilterSelections(roles: readonly string[], statuses: readonly string[]): void {
    this._roleSelections.set(roles);
    this._statusSelections.set(statuses);
    this.applyFilter();
  }

  onSearch(value: string): void {
    this._searchValue.set(value.trim().toLowerCase());
    this.applyFilter();
  }

  onSelectionChange(rows: readonly UserRow[]): void {
    this._selectedRows.set(rows);
  }

  onDeleteModeChange(value: string): void {
    this._deleteMode.set(value as DeleteMode);
  }

  clearManualSelection(clearRef?: BulkClearRefLike): void {
    clearRef?.clear();
    this._selectedRows.set([]);
  }

  clearBuilderSelection(): void {
    this._selectedRows.set([]);
    this.builderMountKey.update((key) => key + 1);
  }

  deleteSelected(clearRef?: BulkClearRefLike): void {
    const rows = this._selectedRows();
    if (!rows.length || this._isDeleting()) {
      return;
    }

    this._isDeleting.set(true);
    const count = rows.length;
    const label = count === 1 ? '1 user' : `${count} users`;

    const loadingRef = this.snackbar.open({
      iconType: 'loading',
      body: `Deleting ${label}…`,
      dismissable: false,
    });

    setTimeout(() => {
      loadingRef.dismiss();

      if (this._resolvesAsError()) {
        this.snackbar.open({
          iconType: 'error',
          body: 'Failed to delete. Please try again.',
          dismissable: true,
        });
      } else {
        const toDelete = new Set(rows);
        this.dataSource.data = this.dataSource.data.filter((row) => !toDelete.has(row));
        this.filteredLength.set(this.dataSource.filteredData.length);
        clearRef?.clear();
        this._selectedRows.set([]);
        this.builderMountKey.update((key) => key + 1);
        this.snackbar.open({
          iconType: 'success',
          body: `${label} deleted successfully.`,
          dismissable: true,
        });
      }

      this._isDeleting.set(false);
    }, 1500);
  }

  private _resolvesAsError(): boolean {
    const mode = this._deleteMode();
    if (mode === 'success') {
      return false;
    }
    if (mode === 'error') {
      return true;
    }
    return Math.random() < 0.5;
  }

  private applyFilter(): void {
    const search = this._searchValue();
    const roles = [...this._roleSelections()];
    const statuses = [...this._statusSelections()];
    this.dataSource.filter =
      !search && !roles.length && !statuses.length
        ? ''
        : JSON.stringify({ search, roles, statuses });
    this.filteredLength.set(this.dataSource.filteredData.length);
  }
}
