import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/services/auth.guard';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
},

{
  path: 'user/:id',
  component: UserDetailsComponent,
  canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
