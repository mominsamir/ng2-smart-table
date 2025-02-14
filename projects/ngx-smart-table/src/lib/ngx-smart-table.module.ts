import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CellModule } from './components/cell/cell.module';
import { FilterModule } from './components/filter/filter.module';
import { PagerModule } from './components/pager/pager.module';
import { TBodyModule } from './components/tbody/tbody.module';
import { THeadModule } from './components/thead/thead.module';

import { NgxSmartTableComponent } from './ngx-smart-table.component';
import {TreeTBodyModule} from './components/tree-tbody/tbody.module';
import {TreeTHeadModule} from './components/tree-thead/thead.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CellModule,
    FilterModule,
    PagerModule,
    TBodyModule,
    THeadModule,
    TreeTBodyModule,
    TreeTHeadModule,
  ],
  declarations: [
    NgxSmartTableComponent,
  ],
  exports: [
    NgxSmartTableComponent,
  ],
})
export class NgxSmartTableModule {
}
