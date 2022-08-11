import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';

@Component({
  selector: 'tree-table-parent-cell-view-mode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
        <div *ngSwitchDefault>
          <!--          using ngswitch -->
          <ng-container *ngIf="cell.getRow().parent ">
          {{ cell.getValue()}}
          </ng-container>
        </div>
    </div>
    `,
})
export class TreeParentViewCellComponent {
  @Input() cell: Cell;
}
