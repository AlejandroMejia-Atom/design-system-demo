import { Directive, inject } from '@angular/core';
import {
  ATOM_TABLE_SELECTION,
  AtomTableSelectionController,
} from '@atomchat-io/ui-design-system';

/** Clears atom-table selection — must sit on the same `<table atom-table>` host. */
@Directive({
  selector: '[appBulkClearRef]',
  exportAs: 'appBulkClearRef',
})
export class BulkClearRefDirective {
  private readonly _ctrl = inject(ATOM_TABLE_SELECTION) as AtomTableSelectionController<unknown>;

  clear(): void {
    this._ctrl.clear();
  }
}
