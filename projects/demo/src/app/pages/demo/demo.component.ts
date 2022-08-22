import {Component, Input} from '@angular/core';
import {LocalDataSource} from '../../ngx-smart-table/src/lib/lib/data-source/local/local.data-source';

@Component({
  selector: 'icon',
  template: `
    <span class="ng-column-icon" (click)="onExpandAction()">
      <svg width="25" height="25">
        <circle cx='5' cy='5' r='4' stroke='green' stroke-width='1' fill='yellow'></circle>
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
  selector: 'demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {

  snippets = {
    install: require('raw-loader!./snippets/install.md').default,
    require: require('raw-loader!./snippets/require.md').default,
    directive: require('raw-loader!./snippets/directive.md').default,
    settings: require('raw-loader!./snippets/settings.md').default,
    template: require('raw-loader!./snippets/template.md').default,
    array: require('raw-loader!./snippets/array.md').default,
    dataTemplate: require('raw-loader!./snippets/data-template.md').default,
    basicFull: require('raw-loader!./snippets/basic-full.md').default,
  };


  settings = {
    tableType: 'tree',
    benchmarkValue: '2025',
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      select: false,
    },
    pager: {
      display: false,
      // perPage: 10,
    },
    columns: {
      expandAction: {
        title: '',
        filter: false,
        groupBy: true,
        width:'5%',
        type:'custom',
        renderComponent:IconComponents
      },
      id: {
        title: 'Stations',
        filter: true,
        groupBy: true,
        width:'5%',
      },
      kv: {
        title: 'KV',
        filter: true,
        width:'5%',
      },
      installed_mva: {
        title: 'Installed MVA',
        filter: true,
        width:'10%',
      },
      pf: {
        title: 'PF',
        filter: true,
        width:'15%',
      },
      seasonality: {
        title: 'Seasonality',
        groupByFilter: true, // need to change the name
        filter: true,
        width:'5%',
      },
      '2021': {
        title: '2021',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2022': {
        title: '2022',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2023': {
        title: '2023',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2024': {
        title: '2024',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2025': {
        title: '2025',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2026': {
        title: '2026',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2027': {
        title: '2027',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2028': {
        title: '2028',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2029': {
        title: '2029',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2030': {
        title: '2030',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      '2031': {
        title: '2031',
        filter: false,
        isScrollable: true,
        width:'100px',
      },
      action: {
        title: '',
        width: '100px',
        type: 'custom',
        renderComponent: IconComponents,
        isScrollable: true,
        sort: false,
        filter: false,
      },
    },
  };

  data = [
    {
      id: '1s',
      kv: 'Leanne Graham',
      parent: true,
      installed_mva: 'Bret',
      pf: 'Sincere@april.biz',
      seasonality: 'Winter',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2027': '2027',
      '2028': '2028',
      '2029': '2029',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: '1s',
      kv: 'Ervin Howell',
      installed_mva: 'Antonette',
      pf: 'Shanna@melissa.tv',
      seasonality: 'Summer',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2027': '2027',
      '2028': '2028',
      '2029': '2029',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: '1s',
      kv: 'Ervin Howell',
      installed_mva: 'Antonette',
      pf: 'Shanna@melissa.tv',
      seasonality: 'Fall',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2027': '2027',
      '2028': '2028',
      '2029': '2029',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: '2s',
      kv: 'Clementine Bauch',
      installed_mva: 'Samantha',
      pf: 'Nathan@yesenia.net',
      seasonality: 'Winter',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2027': '2027',
      '2028': '2028',
      '2029': '2029',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: '2s',
      kv: 'Patricia Lebsack',
      installed_mva: 'Karianne',
      pf: 'Julianne.OConner@kory.orgJulianne.OConner@kory.org',
      seasonality: 'Fall',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2027': '2027',
      '2028': '2028',
      '2029': '2029',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: '2s',
      kv: 'Clementine Bauch',
      installed_mva: 'Samantha',
      pf: 'Clementine.Bauch@kory.org',
      seasonality: 'Summer',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2027': '2027',
      '2028': '2028',
      '2029': '2029',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: '2s',
      kv: 'Patricia123 ',
      installed_mva: 'Karianne123',
      pf: 'Julianne.OConner@kory.org',
      seasonality: 'Winter',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: '2s',
      kv: 'Clementine321',
      installed_mva: 'Samantha321',
      pf: 'Clementine.Bauch@kory.org',
      seasonality: 'Fall',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: '2s',
      kv: 'Clementine321',
      installed_mva: 'Samantha321',
      pf: 'Clementine.Bauch@kory.org',
      seasonality: 'Summer',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: 4,
      kv: 'Clementine321',
      installed_mva: 'Samantha321',
      pf: 'Clementine.Bauch@kory.org',
      seasonality: 'Clementine.Bauch@kory.org',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: 5,
      kv: 'Clementine321',
      installed_mva: 'Samantha321',
      pf: 'Clementine.Bauch@kory.org',
      seasonality: 'Clementine.Bauch@kory.org',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: 6,
      kv: 'Clementine321',
      installed_mva: 'Samantha321',
      pf: 'Clementine.Bauch@kory.org',
      seasonality: 'Clementine.Bauch@kory.org',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: 6,
      kv: 'Clementine321',
      installed_mva: 'Samantha321',
      pf: 'Clementine.Bauch@kory.org',
      seasonality: 'Clementine.Bauch@kory.org',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2030': '2030',
      '2031': '2031',
    },
    {
      id: 6,
      kv: 'Clementine321',
      installed_mva: 'Samantha321',
      pf: 'Clementine.Bauch@kory.org',
      seasonality: 'Clementine.Bauch@kory.org',
      '2021': '2021',
      '2022': '2022',
      '2023': '2023',
      '2024': '2024',
      '2025': '2025',
      '2026': '2026',
      '2030': '2030',
      '2031': '2031',
    },
  ];

  source: LocalDataSource;

  constructor() {
    this.source = new LocalDataSource(this.data);
  }

}
