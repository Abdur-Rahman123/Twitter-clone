import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Follow } from 'src/models/follow.model';
import { Follower } from 'src/models/followers.model';
import { UserService } from 'src/services/user.service';
import { AuthServiceService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.scss']
})
export class FollowingsComponent implements OnInit {
  constructor(private userService:UserService,
    private auth:AuthServiceService) { }
  @Output() isShowFollowersList = new EventEmitter<boolean>();

  userFollowStatusMap: { [userId: number]: boolean } = {};
  followings:Follower[] =[];

  ngOnInit(): void {
    this.getFollowingList();
  }

  toggleFollowStatus(user: Follower) {
    if (this.userFollowStatusMap[user.id] === undefined) {
      this.userFollowStatusMap[user.id] = false;
    } else {
      this.userFollowStatusMap[user.id] = !this.userFollowStatusMap[user.id];
    }
    if (this.userFollowStatusMap[user.id]===false) {
      this.unFollowAUser(user.id);
    } else {
      this.followAUser(user.id);
    }
  }

  async followAUser(id: number) {
    let obj: Follow = {
      user_id: id
    }
    try {
      let value = await lastValueFrom(this.userService.followAUser(obj))
      console.log(value);
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

  backToNewsFeed(): void {
    this.isShowFollowersList.emit(false);
  }

  async getFollowingList() {
    try {
      let value = await lastValueFrom(this.userService.getFollowingList(this.auth.getMyUserId()))
      console.log(value);
      this.followings =  value?.followings;
      console.log('followers',this.followings.length);
    } catch (error) {
      console.log(error);
    }
  }


}

