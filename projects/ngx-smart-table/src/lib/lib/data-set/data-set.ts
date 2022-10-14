import { Row } from './row';
import { Column } from './column';
import { fieldSorter, fillDataGap, sortAndGroupColumns } from '../helpers';

export class DataSet {

  newRow: Row;

  protected pivotColumns: Array<string> = [];
  protected primaryPivotColumn: string;
  protected lastPivotColumn: string;
  protected data: Array<any> = [];
  protected columns: Array<Column> = [];
  protected rows: Array<Row> = [];
  protected multipleSelectedRows: Set<Row> = new Set();
  protected trackByMultiSelect: string | undefined = undefined;
  protected selectedRow: Row;
  protected expandedRow: Row;
  protected willSelect: string;
  protected enablePivotSort: boolean;

  constructor(data: Array<any> = [], protected columnSettings: Object, protected tableType: string,) {
    this.createColumns(columnSettings);
    this.setData(data);
    this.tableType = tableType;
    this.createNewRow();
  }

  setData(data: Array<any>) {
    this.data = data;
    this.createRows();
  }

  setPivotSort(isSortEnabled: boolean):void {
    this.enablePivotSort = isSortEnabled;
  } 

  getColumns(): Array<Column> {
    return this.columns;
  }

  getExpandedRow(): Row {
    return this.expandedRow;
  }

  getType(): string {
    return this.tableType;
  }

  getPrimaryPivotColumn(): string {
    return this.primaryPivotColumn;
  }

  getLastPivotColumn(): string {
    return this.lastPivotColumn;
  }

  getRows(): Array<Row> {
    return this.rows;
  }

  getMultipleSelectedRows(): Set<Row> {
    return this.multipleSelectedRows;
  }

  getFirstRow(): Row {
    return this.rows[0];
  }

  getLastRow(): Row {
    return this.rows[this.rows.length - 1];
  }

  findRowByData(data: any): Row {
    return this.rows.find((row: Row) => row.getData() === data);
  }

  deselectAll() {
    //this.rows.forEach((row) => { row.isSelected = false;});
     this.getMultipleSelectedRows().clear();
    // we need to clear selectedRow field because no one row selected
    this.selectedRow = undefined;
  }

  clearExpandAll() {
    this.rows.forEach((row) => {
      row.isExpanded = false;
    });
    // we need to clear selectedRow field because no one row selected
    this.expandedRow = undefined;
  }

  selectRow(row: Row): Row | undefined {
    const previousIsSelected = row.isSelected;
    this.deselectAll();

    row.isSelected = !previousIsSelected;
    this.selectedRow = row;

    return this.selectedRow;
  }

  isRowSelected (row: Row): boolean {
    return Array.from(this.getMultipleSelectedRows())
        .find((selectedRow: Row) => selectedRow.getKeyValue() === row.getKeyValue()) !== undefined;
  }

  isSingleRowSelected (row: Row): boolean {
    return row.getKeyValue() ===  this.selectedRow?.getKeyValue();
  }


  multipleSelectRow(row: Row): Row {
      if(row.isSelected) {
            this.multipleSelectedRows.add(row);
      } else { 
          this.multipleSelectedRows.delete(row);
      }
    return row;
  }

  expandRow(row: Row): Row {
    const previousIsExpanded = row.isExpanded;
    this.clearExpandAll();
    if(row.index !== this.expandedRow?.index){
      this.expandedRow = undefined;
    }
    row.isExpanded = !previousIsExpanded;
    this.expandedRow = row;
    return  this.expandedRow;
  }

  selectPreviousRow(): Row {
    if (this.rows.length > 0) {
      let index = this.selectedRow ? this.selectedRow.index : 0;
      if (index > this.rows.length - 1) {
        index = this.rows.length - 1;
      }
      this.selectRow(this.rows[index]);
      return this.selectedRow;
    }
  }

  selectFirstRow(): Row | undefined {
    if (this.rows.length > 0) {
      this.selectRow(this.rows[0]);
      return this.selectedRow;
    }
  }

  selectLastRow(): Row | undefined {
    if (this.rows.length > 0) {
      this.selectRow(this.rows[this.rows.length - 1]);
      return this.selectedRow;
    }
  }

  selectRowByIndex(index: number): Row | undefined {
    const rowsLength: number = this.rows.length;
    if (rowsLength === 0) {
      return;
    }
    if (!index) {
      this.selectFirstRow();
      return this.selectedRow;
    }
    if (index > 0 && index < rowsLength) {
      this.selectRow(this.rows[index]);
      return this.selectedRow;
    }
    // we need to deselect all rows if we got an incorrect index
    this.deselectAll();
  }

  willSelectFirstRow() {
    this.willSelect = 'first';
  }

  willSelectLastRow() {
    this.willSelect = 'last';
  }

  setTrackByMultiSelectByColumn(columnName: string) {
    this.trackByMultiSelect = columnName;
  }

  select(selectedRowIndex?: number): Row | undefined {
    if (this.getRows().length === 0) {
      return;
    }
    if (this.willSelect) {
      if (this.willSelect === 'first') {
        this.selectFirstRow();
      }
      if (this.willSelect === 'last') {
        this.selectLastRow();
      }
      this.willSelect = '';
    } else {
      this.selectRowByIndex(selectedRowIndex);
    }

    return this.selectedRow;
  }

  createNewRow() {
    this.newRow = new Row(-1, {}, this);
    this.newRow.isInEditing = true;
  }

  /**
   * Create columns by mapping from the settings
   * @param settings
   * @private

  createColumns(settings: any) {
    for (const id in settings) {
      if (settings.hasOwnProperty(id)) {
        this.columns.push(new Column(id, settings[id], this));
      }
    }
  }
   */
  createColumns(settings: any) {
    for (const id in settings) {
      if (settings.hasOwnProperty(id)) {
        if (!/^\d/.test(id) && id !== 'action' && !settings[id].lastCellPosition) {
          this.columns.push(new Column(id, settings[id], this));
        }
      }
    }
    for (const id in settings) {
      if(settings[id].hasOwnProperty('groupBy')) {
        if (this.primaryPivotColumn === undefined) this.primaryPivotColumn = id;
        this.pivotColumns.push(id);
      }
      if (settings.hasOwnProperty(id)) {
        if (/^\d/.test(id) || id === 'action' && !settings[id].lastCellPosition) {
          this.columns.push(new Column(id, settings[id], this));
        }
        if (settings[id].lastCellPosition) {
          this.columns.push(new Column(id, settings[id], this));
        }
      }
    }

    this.lastPivotColumn = Object.keys(settings).filter((s: any) => settings[s].hasOwnProperty('groupBy')).pop();
  }

  /**
   * Create rows based on current data prepared in data source
   * @private
   */
  createRows() {
    this.rows = [];
    
    let sortedData = [];

    if(this.getType() === 'pivot') {

      if(this.enablePivotSort) {
        sortedData = this.data.sort(fieldSorter(this.pivotColumns));
      }
      sortedData = sortAndGroupColumns(this.data, this.pivotColumns);
      sortedData = fillDataGap(sortedData, this.getColumns());
    } else {
      sortedData = this.data;
    }

    sortedData.forEach((el, index) => {
      let row: Row = new Row(index, el, this);
      row.setKeyValue(el[this.trackByMultiSelect]);
      this.rows.push(row);
    });
  }
}
