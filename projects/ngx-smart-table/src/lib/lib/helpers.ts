import { cloneDeep } from 'lodash';

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

export function calculateValueChange(obj: any, key: number, currentValue: any): boolean {
//	obj[key]
	if(Object.keys(obj).length === 0) return false;

	return obj.hasOwnProperty(key) && (obj[key].value !== currentValue);
}

export function hasParentValueChanged(obj: any, key: number): boolean {
	//	obj[key]
		if(Object.keys(obj).length === 0) return false;
	
	//	check if key has parent, in that case we should check parent has changed?
		if(obj.hasOwnProperty(key-1)) {
			console.log("IS PARENT " + obj[key-1].key + " " + obj[key-1].hasChanged);
			return obj[key-1].hasChanged;
		} else {
			console.log("Key NOT exists "+ key);
		}
		return false;
}

var currentValueMapIndex  = {
	
}

export function sortAndGroupColumns(data: any[], groupCols: any[]): any[] {
	let currentValueMapIndex = {};
	var sortedData = data.sort(fieldSorter(groupCols));
	for (let index = sortedData.length - 1; index >= 0; index--) {
		const row = sortedData[index];

		Object.keys(row).forEach((k, keyIndex) => {

			if (groupCols.indexOf(k) !== -1) {
				let currentKeyValue = row[k];
				let valueChnaged = false;
				
				console.debug(currentValueMapIndex);

				if(hasParentValueChanged(currentValueMapIndex, keyIndex)) {
					console.log('PARENT changed for '+ k + ' value ' + currentKeyValue);
					row[k] = {
						value: currentKeyValue,
						rowSpan: 1,
						firstRow: false,
					};

					delete currentValueMapIndex[keyIndex+1];
					console.log(Object.keys(currentValueMapIndex).length)
					valueChnaged = true;
				} else {
					console.log('PARENT NOT CHANGED '+ k + ' value ' + currentKeyValue);
					valueChnaged = calculateValueChange(currentValueMapIndex, keyIndex, currentKeyValue);
					console.log('CURRENT VALUE CHANGED '+ k + ' value ' + valueChnaged);
					if(valueChnaged) {
						row[k] = {
							value: currentKeyValue,
							rowSpan: 1,
							firstRow: false,
						};
						valueChnaged = false;
					} else {
						row[k] = {
							value: currentKeyValue,
							rowSpan: currentValueMapIndex[keyIndex]?.rowSpan === undefined ? 1 : currentValueMapIndex[keyIndex]?.rowSpan + 1,
							firstRow: true,
						};
					}
				}

				currentValueMapIndex[keyIndex] = {
					key: k,
					hasChanged : valueChnaged,
					value: currentKeyValue,
					rowSpan: 1
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
	
	return sortedData;
}


export function sortAndGroupColumnsAsc(data: any[], groupCols: any[]): any[] {
	let currentValueMapIndex = {};
	var sortedData = data.sort(fieldSorter(groupCols));
	sortedData.forEach((row)=>{

		Object.keys(row).forEach((k, keyIndex) => {

			if (groupCols.indexOf(k) !== -1) {
				let currentKeyValue = row[k];
				let valueChnaged = false;
				
				console.debug(currentValueMapIndex);

				if(hasParentValueChanged(currentValueMapIndex, keyIndex)) {
					console.log('PARENT changed for '+ k + ' value ' + currentKeyValue);
					row[k] = {
						value: currentKeyValue,
						rowSpan: 1,
						firstRow: false,
					};
					valueChnaged = true;
				} else {
					console.log('PARENT NOT CHANGED '+ k + ' value ' + currentKeyValue);
					valueChnaged = calculateValueChange(currentValueMapIndex, keyIndex, currentKeyValue);
					console.log('CURRENT VALUE CHANGED '+ k + ' value ' + valueChnaged);
					if(!valueChnaged) {
						row[k] = {
							value: currentKeyValue,
							rowSpan: currentValueMapIndex[keyIndex]?.rowSpan === undefined ? 1 : currentValueMapIndex[keyIndex]?.rowSpan + 1,
							firstRow: true,
						};
					} else {
						row[k] = {
							value: currentKeyValue,
							rowSpan: 1,
							firstRow: true,
						};
						valueChnaged = true;
					}
				}

				currentValueMapIndex[keyIndex] = {
					key: k,
					hasChanged : valueChnaged,
					value: currentKeyValue,
					rowSpan: 1
				}

			} else {
				row[k] = {
					value: row[k],
					rowSpan: 1,
					firstRow: true,
				};
			}
		});
	});
	return sortedData;
}
