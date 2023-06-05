import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagerComponent } from './pager.component';
import {CustomPagerButtonComponent} from './custom-pager-button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    PagerComponent,
    CustomPagerButtonComponent
  ],
  exports: [
    PagerComponent,
  ],
})
export class PagerModule { }
