import { Component } from '@angular/core';
import {
  ATOM_TABLE_IMPORTS,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  type DemoRow,
  checkboxDemoRows,
  prependSelectionColumn,
} from '../shared/table-demo.data';
import { ALL_TABLE_EXAMPLES } from '../shared/table-examples.catalog';

const meta = ALL_TABLE_EXAMPLES.find((e) => e.id === 'checkboxes')!;

@Component({
  selector: 'app-checkboxes-example',
  imports: [...ATOM_TABLE_IMPORTS, ExamplePageComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <p class="selection-hint">Max 3 rows can be selected.</p>

      <table
        atom-table
        atomSelectable
        atomSelectionCheckboxes
        [atomMaxSelection]="3"
        [dataSource]="dataSource"
        (atomSelectionChange)="selectedCount = $event.length"
      >
        <atom-table-selection-column [isRowDisabled]="isRowDisabled" />

        <ng-container atomColumnDef="name">
          <th atomHeaderCell *atomHeaderCellDef>Name</th>
          <td atomCell *atomCellDef="let row">{{ row.name }}</td>
        </ng-container>

        <ng-container atomColumnDef="status">
          <th atomHeaderCell *atomHeaderCellDef>Status</th>
          <td atomCell *atomCellDef="let row">{{ row.status }}</td>
        </ng-container>

        <tr atom-header-row *atomHeaderRowDef="displayedColumns"></tr>
        <tr
          atom-row
          *atomRowDef="let row; columns: displayedColumns"
          [atomRowValue]="row"
          [atomDisabled]="row.disabled ?? false"
        ></tr>
      </table>

      <p class="selection-count">Selected: {{ selectedCount }}</p>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class CheckboxesExampleComponent {
  protected readonly meta = meta;
  protected readonly displayedColumns = prependSelectionColumn(['name', 'status']);
  protected readonly dataSource = new AtomTableDataSource(checkboxDemoRows());
  protected selectedCount = 0;

  protected readonly isRowDisabled = (row: unknown) =>
    (row as DemoRow).disabled ?? false;
}
