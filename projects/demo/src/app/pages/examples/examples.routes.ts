import {  Routes } from '@angular/router';

import { ExamplesComponent } from './examples.component';
import { FilterExamplesComponent } from './filter/filter-examples.component';
import { ServerExamplesComponent } from './server/server-examples.component';
import { CustomViewEditExamplesComponent } from './custom-edit-view/custom-edit-view-examples.component';
import { VariousExamplesComponent } from './various/various-examples.component';
import { PivotDemoComponent } from './pivot/pivot.component';
import { PivotExamplesComponent } from './pivot/pivot-examples.component';

export const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'using-filters',
      },
      {
        path: 'using-filters',
        component: FilterExamplesComponent,
      },
      {
        path: 'populate-from-server',
        component: ServerExamplesComponent,
      },
      {
        path: 'custom-editors-viewers',
        component: CustomViewEditExamplesComponent,
      },
      {
        path: 'various',
        component: VariousExamplesComponent,
      },
      {
        path: 'pivot',
        component: PivotExamplesComponent,
      },
    ],
  },
];
