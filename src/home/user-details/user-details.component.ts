import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Follow } from 'src/models/follow.model';
import { Follower } from 'src/models/followers.model';
import { Tweet } from 'src/models/tweets.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  post: string = '';
  users: User[];
  userId: number;
  userFollowStatusMap: { [userId: number]: boolean } = {};
  isShowAllUserList: boolean = false;
  isShowFollowingList: boolean = false;
  isShowFollersList: boolean = false;
  followings:Follower[] =[];
  follwers:Follower[] =[];
  tweets:Tweet[] = [];
  constructor(private router: Router,
    private userService: UserService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.setUserId();
    this.getFollowersList(this.userId);
    this.getFollowingList(this.userId);
    this.getTweetList(this.userId);
  }

  setUserId() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = +params.get('id');
    });
  }

  async getFollowingList(id:number) {
    try {
      let value = await lastValueFrom(this.userService.getFollowingList(id))
      console.log(value);
      this.followings =  value?.followings;
      console.log('followers',this.followings.length);
    } catch (error) {
      console.log(error);
    }
  }

  async getFollowersList(id:number) {
    try {
      let value = await lastValueFrom(this.userService.getFollowersList(id))
      console.log(value);
      this.follwers =  value?.followers;
      console.log('followers',this.follwers.length);
    } catch (error) {
      console.log(error);
    }
  }

  async getTweetList(id:number) {
    try {
      let value = await lastValueFrom(this.userService.getTweetById(id))
      console.log(value);
      this.tweets =  value?.tweets;
    } catch (error) {
      console.log(error);
    }
  }

}
