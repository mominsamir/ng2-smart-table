import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';

import {Grid} from '../../../lib/grid';
import {DataSource} from '../../../lib/data-source/data-source';
import {Column} from '../../../lib/data-set/column';

@Component({
  selector: '[ng2-st-thead-filters-row]',
  styleUrls: ['./thead-row.component.scss'],
  template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th *ngIf="isSingleSelectVisible"></th>
    <th ng2-st-add-button *ngIf="showActionColumnLeft"
        [grid]="grid"
        (create)="create.emit($event)">
    </th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns()) let i=index"
        class="ng2-smart-th {{ column.id }} {{ column.columnClass }}"
        [style.width]="column.width"
        [ngStyle]=" {'left': 'calc('+calculateCellPosition(column.width,column)+' - '+i+'px)' }"
        [ngClass]="[!column.isScrollable ? 'col-filter-'+ (i+1) : '', column.lastFixedCell ? 'break_line':'']">
      <ng2-smart-table-filter [source]="source"
                              [column]="column"
                              [inputClass]="filterInputClass"
                              (filter)="filter.emit($event)">
      </ng2-smart-table-filter>
    </th>
    <th ng2-st-add-button *ngIf="showActionColumnRight"
        [grid]="grid"
        [source]="source"
        (create)="create.emit($event)">
    </th>
  `,
})
export class TheadFitlersRowComponent implements OnChanges {

  @Input() grid: Grid;
  @Input() source: DataSource;

  @Output() create = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();

  isSingleSelectVisible: boolean;
  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  filterInputClass: string;

  ngOnChanges() {
    this.isSingleSelectVisible = this.grid.isSingleSelectVisible();
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.filterInputClass = this.grid.getSetting('filter.inputClass');
  }

  getVisibleColumns(columns: Array<Column>): Array<Column> {
    return (columns || []).filter((column: Column) => !column.hide);
  }

  calculateCellPosition(width, originCell) {
    let currentCellIndex;
    const percentList = [];
    switch (this.grid.getTreeRows().length) {
      case 0 :
        Object.keys(this.grid.settings.columns).map(row => {
          if (row){
            if (!/^\d/.test(row) && row !== 'action'){
              const numbers = parseFloat(this.grid.settings.columns[row].width.replace('%', ''));
              percentList.push(numbers)
              const sum = percentList.reduce((num, a) => num + a, 0);
              return numbers + sum + '%';
            }
          }
        });
        break;
      default:
        this.grid.getTreeRows().map(row => {
          if (row.index) {
            row.cells.map((col, i) => {
              if (col.getId() === originCell.id) {
                currentCellIndex = i;
              }
              if (currentCellIndex === undefined) {
                if (col.getColumn().width) {
                  const numbers = parseFloat(col.getColumn().width.replace('%', ''));
                  percentList.push(numbers);
                }
              }
            });
          }
        });
        const percent = percentList.reduce((num, a) => num + a, 0);
        return percent + '%';
        break;
    }
  }
}
