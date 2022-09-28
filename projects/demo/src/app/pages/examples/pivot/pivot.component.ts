import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ngx-smart-table';


@Component({
	selector: 'season',
	template: `
    {{value}}
  `,
})
export class SeasonComponents {
	@Input() value: string | number;
	@Input() rowData: any;
	customFlag = false;

	constructor() {
	}

}


@Component({
	selector: 'icon',
	template: `
    <span class="ng-column-icon" (click)="onExpandAction()">
      <svg width="25" height="25">
        <circle cx='5' cy='5' r='4' stroke='green' stroke-width='1' fill='black'></circle>
      </svg>
      </span>
  `,

})
export class IconComponents {
	@Input() value: string | number;
	@Input() rowData: any;
	customFlag = false;
	onExpandAction() {
		this.customFlag = !this.customFlag;
		this.rowData = {
			...this.rowData,
			expand: this.customFlag
		}
	}
	constructor() {
	}
}

@Component({
	selector: 'pivot',
	styleUrls : [`./pivot.component.scss`],
	template: `
		<ngx-smart-table [settings]="settings" [source]="this.source"></ngx-smart-table>
	`,
})
export class PivotDemoComponent {
	source: LocalDataSource;
	val = true;
	test() {
		this.val = !this.val;
	}

	settings = {
		"enableHeader": false,
		"tableMode": 'pivot',
		"actions": {
			"position": "right",
			"add": false,
			"edit": false,
			"delete": false,
			"select": false
		},
		"pager": {
			"display": false,
			"perPage": 1000
		},
		"columns": {
			"factorId": {
				"title": "Factor",
				"filter": true,
				"groupBy": true,
			},
			"seasonName": {
				"title": "seasonName",
				"filter": false,
				"groupBy": true,
			},
			"seasonId": {
				"title": "Season",
				"groupBy": true,
				"width": "10%",
				"filterOperator": "EQUAL",
				"filter": {
					"type": "list",
					"config": {
						"selectText": "All",
						"list": [
							{
								"value": "W",
								"title": "Winter"
							},
							{
								"value": "S",
								"title": "Summer"
							}
						]
					}
				}
			},
			"2020": {
				"title": "2020",
				"filter": false,
				"isScrollable": true,
				"type": "html",
				"class": "actual"
			},
			"2021": {
				"title": "2021",
				"filter": false,
				"type": "html",
				"class": "actual"
			},
			"2022": {
				"title": "2022",
				"filter": false,
				"type": "html",
				"class": "actual"
			},
			"2023": {
				"title": "2023",
				"filter": false,
				"type": "html",
				"class": "forecast"
			},
			"2024": {
				"title": "2024",
				"filter": false,
				"isScrollable": true,
				"type": "html",
				"class": "forecast"
			},
			"2025": {
				"title": "2025",
				"filter": false,
				"type": "html",
				"class": "forecast"
			},
			"2026": {
				"title": "2026",
				"filter": false,
				"type": "html",
				"class": "forecast"
			},
			"2027": {
				"title": "2027",
				"filter": false,
				"type": "html",
				"class": "forecast"
			},
			"2028": {
				"title": "2028",
				"filter": false,
				"type": "html",
				"class": "forecast"
			},
			"2029": {
				"title": "2029",
				"filter": false,
				"type": "html",
				"class": "forecast"
			},			
			"action": {
				"title": "",
				"type": "custom",
				"sort": false,
				"filter": false,
				renderComponent: IconComponents,
			}
		}
	}
	data = [
			{
				"2023": 0.0,
				"2022": 0.0,
				"2021": 0.0,
				"2020": 0.0,
				"2019": 0.0,
				"2018": 0.0,
				"2029": 0.0,
				"2017": 0.0,
				"2028": 0.0,
				"2016": 0.0,
				"2027": 0.0,
				"2015": 0.0,
				"2026": 0.0,
				"2014": 0.0,
				"2025": 0.0,
				"2024": 0.0,
				"factorId": "ELECTRIC_VEHICLE",
				"seasonId": "S",
				"seasonName": "Summer",

			},
			{
				"2023": "NaN",
				"2022": "NaN",
				"2021": "NaN",
				"2020": "NaN",
				"factorId": "ELECTRIC_VEHICLE",
				"2019": 0.0,
				"2018": 0.0,
				"2029": "NaN",
				"2017": 0.0,
				"2028": "NaN",
				"2016": 0.0,
				"2027": "NaN",
				"seasonId": "W",
				"2015": 0.0,
				"2026": "NaN",
				"2014": 0.0,
				"2025": "NaN",
				"seasonName": "Winter",
				"2024": "NaN"
			},
			{
				"2023": 24.59275,
				"2022": 25.146726552970406,
				"2021": 30.968829662733924,
				"2020": -4.272004615384615,
				"factorId": "LLA",
				"2019": 0.0,
				"2018": 0.0,
				"2029": 22.303033157894735,
				"2017": 0.0,
				"2028": 23.479063157894736,
				"2016": 0.0,
				"2027": 26.91777368421053,
				"seasonId": "S",
				"2015": 0.0,
				"2026": 27.993166842105257,
				"2014": 0.0,
				"2025": 27.217096842105267,
				"seasonName": "Summer",
				"2024": 25.472148684210527
			},
			{
				"2023": "NaN",
				"2022": "NaN",
				"2021": "NaN",
				"2020": "NaN",
				"factorId": "LLA",
				"2019": 0.0,
				"2018": 0.0,
				"2029": "NaN",
				"2017": 0.0,
				"2028": "NaN",
				"2016": 0.0,
				"2027": "NaN",
				"seasonId": "W",
				"2015": 0.0,
				"2026": "NaN",
				"2014": 0.0,
				"2025": "NaN",
				"seasonName": "Summer",
				"2024": "NaN"
			},
			{
				"2023": 0.0,
				"2022": 2.2013913818449495,
				"2021": -1.7763568394002505E-15,
				"2020": 3.3044065306799033,
				"factorId": "LOAD_TRANSFER",
				"2019": 0.0,
				"2018": 0.0,
				"2029": 0.0,
				"2017": 0.0,
				"2028": 0.0,
				"2016": 0.0,
				"2027": 0.0,
				"seasonId": "S",
				"2015": 0.0,
				"2026": 0.0,
				"2014": 0.0,
				"2025": 0.0,
				"seasonName": "Summer",
				"2024": 0.0
			},
			{
				"2023": "NaN",
				"2022": "NaN",
				"2021": "NaN",
				"2020": "NaN",
				"factorId": "LOAD_TRANSFER",
				"2019": 0.0,
				"2018": 0.0,
				"2029": "NaN",
				"2017": 0.0,
				"2028": "NaN",
				"2016": 0.0,
				"2027": "NaN",
				"seasonId": "W",
				"2015": 0.0,
				"2026": "NaN",
				"2014": 0.0,
				"2025": "NaN",
				"seasonName": "Winter",
				"2024": "NaN"
			},
			{
				"2023": -0.8178485257354817,
				"2022": -3.3278028395175108,
				"2021": 52.63836307128956,
				"2020": -89.56629636733322,
				"factorId": "ORGANIC_GROWTH",
				"2019": 0.0,
				"2018": 0.0,
				"2029": -0.34636564499538286,
				"2017": 0.0,
				"2028": -0.3931833950917175,
				"2016": 0.0,
				"2027": -0.4380615766059806,
				"seasonId": "S",
				"2015": 0.0,
				"2026": -0.48125609862972507,
				"2014": 0.0,
				"2025": -1.700741514400237,
				"seasonName": "Summer",
				"2024": -0.7179202011672638
			},
			{
				"2023": "NaN",
				"2022": "NaN",
				"2021": "NaN",
				"2020": "NaN",
				"factorId": "ORGANIC_GROWTH",
				"2019": 0.0,
				"2018": 0.0,
				"2029": "NaN",
				"2017": 0.0,
				"2028": "NaN",
				"2016": 0.0,
				"2027": "NaN",
				"seasonId": "W",
				"2015": 0.0,
				"2026": "NaN",
				"2014": 0.0,
				"2025": "NaN",
				"seasonName": "Winter",
				"2024": "NaN"
			},
			{
				"2023": 0.0,
				"2022": 0.0,
				"2021": 0.0,
				"2020": 0.0,
				"factorId": "PHOTOVOLTAIC",
				"2019": 0.0,
				"2018": 0.0,
				"2029": 0.0,
				"2017": 0.0,
				"2028": 0.0,
				"2016": 0.0,
				"2027": 0.0,
				"seasonId": "S",
				"2015": 0.0,
				"2026": 0.0,
				"2014": 0.0,
				"2025": 0.0,
				"seasonName": "Summer",
				"2024": 0.0
			},
			{
				"2023": "NaN",
				"2022": "NaN",
				"2021": "NaN",
				"2020": "NaN",
				"factorId": "PHOTOVOLTAIC",
				"2019": 0.0,
				"2018": 0.0,
				"2029": "NaN",
				"2017": 0.0,
				"2028": "NaN",
				"2016": 0.0,
				"2027": "NaN",
				"seasonId": "W",
				"2015": 0.0,
				"2026": "NaN",
				"2014": 0.0,
				"2025": "NaN",
				"seasonName": "Winter",
				"2024": "NaN"
			}
		];

	constructor() {
		this.source = new LocalDataSource(this.data);
	}

}
