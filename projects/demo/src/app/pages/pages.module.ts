import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSmartTableModule } from 'projects/ngx-smart-table/src/public-api';

import { routes } from './pages.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxSmartTableModule,
    SharedModule,
  ],
})
export class PagesModule {
}
