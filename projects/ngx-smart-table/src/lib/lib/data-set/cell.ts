import { Column } from './column';
import { DataSet } from './data-set';
import { Row } from './row';

export function prepareValue(value: any) { return value }

export class Cell {

	newValue: any = '';
	visiable: boolean = true;
	protected static PREPARE = prepareValue;

	constructor(protected value: any, protected row: Row, protected column: any, protected dataSet: DataSet) {
		this.newValue = value;
	}

	getColumn(): Column {
		return this.column;
	}

	getRow(): Row {
		return this.row;
	}

	getValue(): any {
		const valid = this.column.getValuePrepareFunction() instanceof Function;
		const prepare = valid ? this.column.getValuePrepareFunction() : Cell.PREPARE;

		if (this.dataSet.getType() === 'pivot') {
			return prepare.call(null, this.value.value, this.row.getData(), this);
		} else {
			return prepare.call(null, this.value, this.row.getData(), this);
		}
	}

	isFirstRow(): boolean {
		if (this.dataSet.getType() === 'pivot') {
			return this.value.firstRow;
		} 
		return false;
	}

	isPrimaryPivotCell(): boolean {
		if (this.dataSet.getType() === 'pivot') {
			return this.dataSet.getPrimaryPivotColumn() === this.getColumn().id;		
		}
		return false;
	}

	getRowSpan(): number {
		return this.value.rowSpan;
	}

	setValue(value: any): any {
		this.newValue = value;
	}

	isCellVisible():boolean {
		return this.visiable;
	}
	
	toogleVisibility():void {
		if(!this.isPrimaryPivotCell()) {
			this.visiable = !this.visiable;
		}
	}

	getId(): string {
		return this.getColumn().id;
	}

	getTitle(): string {
		return this.getColumn().title;
	}

	isEditable(): boolean {
		if (this.getRow().index === -1) {
			return this.getColumn().isAddable;
		}
		else {
			return this.getColumn().isEditable;
		}
	}

}
