import { Component } from '@angular/core';
import { AtomEmptyStateComponent } from '@atomchat-io/ui-design-system';

import { TABLE_BUILDER_DEMO_IMPORTS } from '../shared/table-builder.imports';

import { ExamplePageComponent } from '../shared/example-page.component';
import { BASIC_COLUMNS, trackProductBy } from '../shared/table-builder-demo.data';
import { tableBuilderExampleById } from '../shared/table-builder-examples.catalog';

const meta = tableBuilderExampleById('empty-state');

@Component({
  selector: 'app-empty-state-example',
  imports: [...TABLE_BUILDER_DEMO_IMPORTS, AtomEmptyStateComponent, ExamplePageComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
      [codeSnippet]="meta.codeSnippet"
    >
      <div class="example-page__table-viewport">
        <atom-table-builder [columns]="columns" [dataSource]="data" [atomTrackBy]="trackBy">
          <ng-template atomNoDataRow>
            <tr class="atom-no-data-row">
              <td [attr.colspan]="columns.length">
                <atom-empty-state
                  heading="No records"
                  supportingText="The dataset is empty — add rows or adjust filters."
                />
              </td>
            </tr>
          </ng-template>
        </atom-table-builder>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class EmptyStateExampleComponent {
  protected readonly meta = meta;
  protected readonly data: never[] = [];
  protected readonly columns = BASIC_COLUMNS;
  protected readonly trackBy = trackProductBy;
}
