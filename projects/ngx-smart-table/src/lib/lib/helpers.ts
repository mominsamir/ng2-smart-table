import { cloneDeep } from 'lodash';
import { Column } from './data-set/column';

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
export const deepExtend = function (...objects: Array<any>): any {
	if (arguments.length < 1 || typeof arguments[0] !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	const target = arguments[0];

	// convert arguments to array and cut off target object
	const args = Array.prototype.slice.call(arguments, 1);

	let val, src;

	args.forEach((obj: any) => {
		// skip argument if it is array or isn't object
		if (typeof obj !== 'object' || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = target[key]; // source value
			val = obj[key]; // new value

			// recursion prevention
			if (val === target) {
				return;

				/**
				 * if new value isn't object then just overwrite by new value
				 * instead of extending.
				 */
			} else if (typeof val !== 'object' || val === null) {
				target[key] = val;
				return;

				// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = cloneDeep(val);
				return;

				// overwrite by new value if source isn't object or array
			} else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

				// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
};

export class Deferred {

	promise: Promise<any>;

	resolve: any;
	reject: any;

	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
}

// getDeepFromObject({result: {data: 1}}, 'result.data', 2); // returns 1
export function getDeepFromObject(object = {}, name: string, defaultValue?: any) {
	const keys = name.split('.');
	// clone the object
	let level = deepExtend({}, object);
	keys.forEach((k) => {
		if (level && typeof level[k] !== 'undefined') {
			level = level[k];
		}
	});

	return typeof level === 'undefined' ? defaultValue : level;
}

export function getPageForRowIndex(index: number, perPage: number): number {
	// we need to add 1 to convert 0-based index to 1-based page number.
	return Math.floor(index / perPage) + 1;
}

export function fieldSorter(fields: any[]): any {
	return function (a: any, b: any) {
		return fields
			.map(function (o: any) {
				var dir = 1;
				if (o[0] === '-') {
					dir = -1;
					o = o.substring(1);
				}
				if (a[o] > b[o]) return dir;
				if (a[o] < b[o]) return -(dir);
				return 0;
			})
			.reduce(function firstNonZeroValue(p: any, n: any) {
				return p ? p : n;
			}, 0);
	};
}

export function calculateValueChange(obj: any, keyInd: number, currentValue: any): boolean {
	if (Object.keys(obj).length === 0) return false;
	return obj.hasOwnProperty(keyInd) && (obj[keyInd].value !== currentValue);
}

// TODO: remvoe?
export function hasParentValueChanged(obj: any, keyInd: number): boolean {
	//	obj[key]
	if (Object.keys(obj).length === 0) return false;

	//	check if key has parent, in that case we should check parent has changed?
	if (obj.hasOwnProperty(keyInd - 1)) {
		//			console.log("hasParentValueChanged IS PARENT " + obj[keyInd-1].key + " " + obj[keyInd-1].hasChanged);
		return obj[keyInd - 1].hasChanged;
	} else {
		//			console.log("hasParentValueChanged Key NOT exists "+ keyInd);
	}
	return false;
}

export function sortAndGroupColumns(data: any[], groupCols: any[]): any[] {
	let currentValueMapIndex = {}; // current row
	let previousValueMapIndex = {}; // previous row
	var sortedData = data.sort(fieldSorter(groupCols));

	for (let index = sortedData.length - 1; index >= 0; index--) {
		// Temporary: for simplicity, introduce a separate data holder for previous and current rows
		previousValueMapIndex = currentValueMapIndex;
		currentValueMapIndex = {}; // reset

		const row = sortedData[index];
		let rowParentColChanged = false;

		// Create an ordered list of parameters: groupCols (in order) followed by all other columns
		[...groupCols, ...Object.keys(row).filter(k => !groupCols.includes(k))].forEach((k, keyIndex) => {
			// Key is part of groupCols
			if (groupCols.indexOf(k) !== -1) {
				let currentKeyValue = row[k];
				// let valueChnaged = false;
				let rowSpan = 1;

				// Check: column value for current row vs. previous row OR previous columns for this row have changed.
				if (calculateValueChange(previousValueMapIndex, keyIndex, currentKeyValue) || rowParentColChanged) {
					/*
					 * Column value has changed from previous row.
					 * 1. Reset previous row: firstRow = true
					 * 2. Set current row to default: firstRow = false, rowSpan = 1 (this is default)
					 */
					if (index != (sortedData.length - 1)) {
						const prevRow = sortedData[index + 1];
						prevRow[k] = {
							...prevRow[k],
							firstRow: true,
						};
					}
					rowParentColChanged = true; // Further "children" are forced to reset rowSpan as well
				} else {
					/*
					 * Column value is same as previous row AND previous columns for this row have not changed.
					 * 1. Set current row: rowSPan = prev.rowSpan + 1 (if exists, else 1)
					 */
					rowSpan = previousValueMapIndex[keyIndex]?.rowSpan === undefined ? 1 : previousValueMapIndex[keyIndex]?.rowSpan + 1;
				}

				// Update tracking for this row and key
				row[k] = {
					value: currentKeyValue,
					rowSpan: rowSpan,
					firstRow: false, // only the next row may reset this to "true"
				};
				// Add keyIndex to tracking for current row
				currentValueMapIndex[keyIndex] = {
					key: k,
					// hasChanged: valueChnaged,
					value: currentKeyValue,
					rowSpan: rowSpan,
				}
			} else {
				row[k] = {
					value: row[k],
					rowSpan: 1,
					firstRow: true,
				};
			}
		});
	}

	// Final step: update first data row with firstRow = true
	if (sortedData.length >= 1) {
		const rowOne = sortedData[0];
		Object.keys(rowOne).forEach((k, keyIndex) => {
			rowOne[k] = {
				...rowOne[k],
				firstRow: true,
			};
		});
	}

	return sortedData;
}

export function fillDataGap(data: any[], columns: Column[]): any[] {
	data.forEach(row=> {
		columns.forEach(c=> {
			if(!row.hasOwnProperty(c.id)) {
				row[c.id] = {
					value: '',
					rowSpan: 1,
					firstRow: true,
				};
			}
		});
	});
	return data;
}


