import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {Cell} from '../../../lib/data-set/cell';

@Component({
  selector: 'tree-table-cell-view-mode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="cell.getColumn().type">
      <ng-container *ngSwitchCase="'custom'">
        <custom-view-component *ngIf="cell.getRow().showFirstValueInGroup"
                               [cell]="cell"></custom-view-component>
      </ng-container>
      <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
      <div *ngSwitchDefault>
        <ng-container *ngIf="!(!cell.getRow().isFirstColumn && cell.getColumn().isMergeColumn)">
          {{ cell.getValue()}}
        </ng-container>
      </div>
    </div>
  `,
})
export class TreeChildrenViewCellComponent {
  @Input() cell: Cell;
}
