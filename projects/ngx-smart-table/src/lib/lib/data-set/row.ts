import { Cell } from './cell';
import { Column } from './column';
import { DataSet } from './data-set';

export class Row {

  isSelected: boolean = false;
  isInEditing: boolean = false;
  isExpanded: boolean = false;

  hide: boolean = false; //added
  onChange: boolean = false; //added
  showFirstValueInGroup: boolean = false; //added
  isFirstRow: boolean = false; //added
  showRowspanBotton: boolean = false; //added

  cells: Array<Cell> = [];
  keyValue : string| number | undefined = undefined;


  constructor(public index: number, protected data: any, protected _dataSet: DataSet) {
    this.process();
  }

  getCell(column: Column): Cell {
    return this.cells.find(el => el.getColumn() === column);
  }

  getCells() {
    return this.cells;
  }

  getData(): any {
    return this.data;
  }

  getIsSelected(): boolean {
    return this.isSelected;
  }

  getIsExpanded(): boolean {
    return this.isExpanded;
  }

  getNewData(): any {
    const values = Object.assign({}, this.data);
    this.getCells().forEach((cell) => values[cell.getColumn().id] = cell.newValue);
    return values;
  }

  setData(data: any): any {
    this.data = data;
    this.process();
  }

  process() {
    this.cells = [];
    this._dataSet.getColumns().forEach((column: Column) => {
      const cell = this.createCell(column);
      this.cells.push(cell);
    });
  }

  setKeyValue(keyValue: string | number | undefined) {
    this.keyValue = keyValue;
  }

  getKeyValue = () => {
    return this.keyValue;
  }

  createCell(column: Column): Cell {
    const defValue = (column as any).settings.defaultValue ? (column as any).settings.defaultValue : '';
    const value = typeof this.data[column.id] === 'undefined' ? defValue : this.data[column.id];
    return new Cell(value, this, column, this._dataSet);
  }
}
