import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Follow } from 'src/models/follow.model';
import { Follower } from 'src/models/followers.model';
import { User } from 'src/models/user.model';
import { AuthServiceService } from 'src/services/auth-service.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  constructor(private userService:UserService,
    private auth:AuthServiceService) { }
  @Output() isShowFollowersList = new EventEmitter<boolean>();

  userFollowStatusMap: { [userId: number]: boolean } = {};
  follwers:Follower[] =[];

  ngOnInit(): void {
    this.getFollowersList();
  }

  toggleFollowStatus(user: Follower) {
    if (this.userFollowStatusMap[user.id] === undefined) {
      this.userFollowStatusMap[user.id] = true;
    } else {
      this.userFollowStatusMap[user.id] = !this.userFollowStatusMap[user.id];
    }
    if (this.userFollowStatusMap[user.id]===false) {
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

  async getFollowersList() {
    try {
      let value = await lastValueFrom(this.userService.getFollowersList(this.auth.getMyUserId()))
      console.log(value);
      this.follwers =  value?.followers;
      console.log('followers',this.follwers.length);
    } catch (error) {
      console.log(error);
    }
  }

}
