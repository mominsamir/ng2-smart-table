import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'projects/ngx-smart-table/src/public-api';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

}
