import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';

import {Grid} from '../../lib/grid';
import {DataSource} from '../../lib/data-source/data-source';
import {Cell} from '../../lib/data-set/cell';
import {delay} from 'rxjs/operators';
import {Row} from '../../lib/data-set/row';

@Component({
  selector: '[ng2-st-tree-tbody]',
  styleUrls: ['./tbody.component.scss'],
  templateUrl: './tbody.component.html',
})
export class Ng2SmartTreeTableTbodyComponent implements AfterViewInit, OnDestroy {

  @Input() grid: Grid;
  @Input() source: DataSource;
  @Input() deleteConfirm: EventEmitter<any>;
  @Input() editConfirm: EventEmitter<any>;
  @Input() rowClassFunction: Function;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
  @Output() edited = new EventEmitter<any>();
  @Output() userSelectRow = new EventEmitter<any>();
  @Output() editRowSelect = new EventEmitter<any>();
  @Output() multipleSelectRow = new EventEmitter<any>();
  @Output() rowHover = new EventEmitter<any>();
  @Output() onExpandRow = new EventEmitter<any>();

  @ViewChildren('expandedRowChild', {read: ViewContainerRef}) expandedRowChild: QueryList<any>;
  @ViewChildren('emptyDataChild', {read: ViewContainerRef}) emptyDataChild: QueryList<any>;
  customComponent: any;
  emptyDataComponent: any;
  hasChildComponent: boolean = false;
  hasEmptyComponent: boolean = false;


  constructor(private resolver: ComponentFactoryResolver, private vcRef: ViewContainerRef, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    let cmp = this.grid.settings['expandedRowComponent'];

    if (cmp && !this.customComponent) {
      this.expandedRowChild.forEach(c => c.clear());
      this.hasChildComponent = true;
      this.createCustomComponent();
    }

    let emptyData = this.grid.settings['emptyDataComponent'];

    if (emptyData && !this.emptyDataComponent) {
      this.emptyDataChild.forEach(c => c.clear());
      this.hasEmptyComponent = true;
      this.createEmptyComponent();
    }
    this.cdr.detectChanges();

  }

  ngOnDestroy(): void {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
    if (this.emptyDataComponent) {
      this.emptyDataComponent.destroy();
    }

  }

  clear() {
    this.vcRef.clear();
  }

  isRowSelected = (row: Row): boolean => {
    if (this.isSingleSelectVisible) {
      return this.grid.getDataSet().isSingleRowSelected(row);
    }
    return this.grid.getDataSet().isRowSelected(row);
  };

  protected createCustomComponent() {
    const componentFactory = this.resolver.resolveComponentFactory(this.grid.settings['expandedRowComponent']);
    this.expandedRowChild.changes
      .pipe(delay(0))
      .subscribe(item => {
        if (item.length) {
          this.customComponent = item.first.createComponent(componentFactory);
          Object.assign(this.customComponent.instance, this.grid.dataSet.expandRow, {
            rowData: this.grid.dataSet.getExpandedRow().getData(),
          });
        }
      });
  }

  protected createEmptyComponent() {
    const componentFactory = this.resolver.resolveComponentFactory(this.grid.settings['emptyDataComponent']);
    this.emptyDataChild.changes
      .pipe(delay(0))
      .subscribe(item => {
        if (item.length) {
          this.emptyDataComponent = item.first.createComponent(componentFactory);
          Object.assign(this.emptyDataComponent.instance, {}, {
            rowData: this.noDataMessage,
          });
        }
      });
  }

  isSingleSelectVisible: boolean;
  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  mode: string;
  editInputClass: string;
  isActionAdd: boolean;
  isActionEdit: boolean;
  isActionDelete: boolean;
  noDataMessage: String;

  get tableColumnsCount() {
    const actionColumns = this.isActionAdd || this.isActionEdit || this.isActionDelete ? 1 : 0;
    const selectColumns = this.isMultiSelectVisible || this.isSingleSelectVisible ? 1 : 0;
    return this.grid.getColumns().length + actionColumns + selectColumns;
  }

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.isSingleSelectVisible = this.grid.isSingleSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.mode = this.grid.getSetting('mode');
    this.editInputClass = this.grid.getSetting('edit.inputClass');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.isActionAdd = this.grid.getSetting('actions.add');
    this.isActionEdit = this.grid.getSetting('actions.edit');
    this.isActionDelete = this.grid.getSetting('actions.delete');
    this.noDataMessage = this.grid.getSetting('noDataMessage');
  }

  getVisibleCells(cells: Array<Cell>): Array<Cell> {
    const result = (cells || []).filter((cell: Cell) => !cell.getColumn().hide);
    return result;
  }

  onExpandRowClick(row: Row) {
    this.onExpandRow.emit(row);
  }

  calculateCellPosition(column, originCell, cellIndex) {
    let currentCellIndex;
    const percentList = [];
    this.grid.getTreeRows().map(row => {
      row.cells.map((col, i) => {
        if (col.getId() === originCell.getId()) {
          currentCellIndex = i;
        }
        if (currentCellIndex === undefined) {
          const numbers = parseFloat(col.getColumn().width.replace('%', ''));
          percentList.push(numbers);
        }
      });
    });
    const percent = percentList.reduce((num, a) => num + a, 0);
    if (column.isFirstColumn) {
      return percent + '%';
    } else {
      return `${percent}% - ${cellIndex}px`;
    }
  }
}
