import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [ UserComponent ],
  imports     : [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  providers   : [],
  exports     : []
})
export class UserModule {}
