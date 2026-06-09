import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ATOM_TABLE_IMPORTS,
  AtomEmptyStateComponent,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import { type DemoRow } from '../shared/table-demo.data';
import { ALL_TABLE_EXAMPLES } from '../shared/table-examples.catalog';

const meta = ALL_TABLE_EXAMPLES.find((e) => e.id === 'empty-state')!;

@Component({
  selector: 'app-empty-state-example',
  imports: [...ATOM_TABLE_IMPORTS, AtomEmptyStateComponent, ExamplePageComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <table atom-table atomSelectable [dataSource]="dataSource">
        <ng-container atomColumnDef="name">
          <th atomHeaderCell *atomHeaderCellDef>Name</th>
          <td atomCell *atomCellDef="let row">{{ row.name }}</td>
        </ng-container>

        <tr atom-header-row *atomHeaderRowDef="['name']"></tr>
        <tr
          atom-row
          *atomRowDef="let row; columns: ['name']"
          [atomSelected]="selection.isSelected(row)"
          (click)="selection.toggle(row)"
        ></tr>

        <ng-template atomNoDataRow>
          <tr>
            <td colspan="1">
              <atom-empty-state
                heading="No data"
                supportingText="Nothing to show"
              />
            </td>
          </tr>
        </ng-template>
      </table>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class EmptyStateExampleComponent {
  protected readonly meta = meta;
  protected readonly dataSource = new AtomTableDataSource<DemoRow>([]);
  protected readonly selection = new SelectionModel<DemoRow>(true, []);
}
