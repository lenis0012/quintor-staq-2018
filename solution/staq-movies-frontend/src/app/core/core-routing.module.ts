import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'movies'
  },
  {
    path        : 'users/:id',
    loadChildren: '../user/user.module#UserModule'
  },
  {
    path        : 'movies',
    loadChildren: '../movie/movie.module#MovieModule'
  },
  {
    path     : '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class CoreRoutingModule {}
