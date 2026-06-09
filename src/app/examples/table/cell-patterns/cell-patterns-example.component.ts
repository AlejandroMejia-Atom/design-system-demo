import { Component } from '@angular/core';
import {
  ATOM_TABLE_IMPORTS,
  AtomButtonComponent,
  AtomChipComponent,
  AtomTableDataSource,
  AtomTagComponent,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import { DEMO_DATA } from '../shared/table-demo.data';
import { ALL_TABLE_EXAMPLES } from '../shared/table-examples.catalog';

const meta = ALL_TABLE_EXAMPLES.find((e) => e.id === 'cell-patterns')!;

@Component({
  selector: 'app-cell-patterns-example',
  imports: [
    ...ATOM_TABLE_IMPORTS,
    AtomTagComponent,
    AtomChipComponent,
    AtomButtonComponent,
    ExamplePageComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <table atom-table [dataSource]="dataSource">
        <ng-container atomColumnDef="name">
          <th atomHeaderCell *atomHeaderCellDef>Name (text — left)</th>
          <td atomCell *atomCellDef="let row">{{ row.name }}</td>
        </ng-container>

        <ng-container atomColumnDef="status">
          <th atomHeaderCell *atomHeaderCellDef>Status (tag — center)</th>
          <td atomCell *atomCellDef="let row">
            <span atomTag variant="filled" intent="success" size="xs">{{
              row.status
            }}</span>
          </td>
        </ng-container>

        <ng-container atomColumnDef="label">
          <th atomHeaderCell *atomHeaderCellDef>Label (chip — center)</th>
          <td atomCell *atomCellDef="let row">
            <atom-chip size="s">{{ row.status }}</atom-chip>
          </td>
        </ng-container>

        <ng-container atomColumnDef="actions">
          <th atomHeaderCell *atomHeaderCellDef>Actions (button — right)</th>
          <td atomCell *atomCellDef="let row">
            <button atom-button="secondary" size="s">Edit</button>
          </td>
        </ng-container>

        <tr atom-header-row *atomHeaderRowDef="displayedColumns"></tr>
        <tr atom-row *atomRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class CellPatternsExampleComponent {
  protected readonly meta = meta;
  protected readonly displayedColumns = ['name', 'status', 'label', 'actions'];
  protected readonly dataSource = new AtomTableDataSource(DEMO_DATA.slice(0, 5));
}
