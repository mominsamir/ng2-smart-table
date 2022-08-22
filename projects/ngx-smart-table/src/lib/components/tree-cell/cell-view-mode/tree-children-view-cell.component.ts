import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {Cell} from '../../../lib/data-set/cell';

@Component({
  selector: 'tree-table-cell-view-mode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="cell.getColumn().type">
      <ng-container *ngSwitchCase="'custom'">
        <custom-view-component *ngIf="cell.getRow().parent && cell.getRow().rowspan"
                               [cell]="cell"></custom-view-component>
      </ng-container>
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
