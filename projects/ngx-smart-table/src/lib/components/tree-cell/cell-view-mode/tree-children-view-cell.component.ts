import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {Cell} from '../../../lib/data-set/cell';

@Component({
  selector: 'tree-table-cell-view-mode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="cell.getColumn().type">
      <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
      <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
      <div *ngSwitchDefault>
        <ng-container>
          {{ cell.getValue()}}
        </ng-container>
      </div>
    </div>
  `,
})
export class TreeChildrenViewCellComponent {
  @Input() cell: Cell;
}
