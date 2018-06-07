import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ NotFoundComponent ],
  imports     : [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
  ],
  providers   : [],
  exports     : [ RouterModule ]
})
export class CoreModule {}
