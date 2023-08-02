import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { lastValueFrom } from 'rxjs';
import { Follow } from 'src/models/follow.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  users: User[];
  userFollowStatusMap: { [userId: number]: boolean } = {};
  @Output() isShowAllUserList = new EventEmitter<boolean>();
  @Input('userlist')
  set userlist(v: User[]) {
    if (!v) return;
    this.users = v;
  }
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  backToNewsFeed(): void {
    this.isShowAllUserList.emit(false);
  }

  toggleFollowStatus(user: User) {
    if (this.userFollowStatusMap[user.id] === undefined) {
      this.userFollowStatusMap[user.id] = true;
    } else {
      this.userFollowStatusMap[user.id] = !this.userFollowStatusMap[user.id];
    }
    if (this.userFollowStatusMap[user.id]) {
      this.followAUser(user.id);
    } else {
      this.unFollowAUser(user.id);
    }
  }

  async followAUser(id: number) {
    let obj: Follow = {
      user_id: id
    }
    try {
      let value = await lastValueFrom(this.userService.followAUser(obj))
      console.log(value);
      console.log(value)
    } catch (error) {
      console.log(error);
    }
  }

  async unFollowAUser(id: number) {
    let obj: Follow = {
      user_id: id
    }
    try {
      let value = await lastValueFrom(this.userService.unFollowAUser(obj))
      console.log(value);
      console.log(value)
    } catch (error) {
      console.log(error);
    }
  }

  goToUserProfile(userId: number) {
    this.router.navigate(['home/user', userId]);
  }
}
