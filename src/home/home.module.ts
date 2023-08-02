import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserlistComponent } from './userlist/userlist.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FollowersComponent } from './followers/followers.component';
import { FollowingsComponent } from './followings/followings.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserlistComponent,
    FollowersComponent,
    FollowingsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class HomeModule { }
