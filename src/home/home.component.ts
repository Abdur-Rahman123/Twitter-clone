import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Follow } from 'src/models/follow.model';
import { SearchUser } from 'src/models/search-user.model';
import { Tweet } from 'src/models/tweets.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  post: string = '';
  users: User[];
  searchTerm: string = '';
  tweetsList: any;
  searchUserList: User[] = [];
  tweets: Tweet[] = [];
  searching: boolean = false;
  userFollowStatusMap: { [userId: number]: boolean } = {};
  isShowAllUserList: boolean = false;
  isShowFollowingList: boolean = false;
  isShowFollersList: boolean = false;
  constructor(private router: Router,
    private userService: UserService) {
    console.log('geo to home page');
  }

  postForm: FormGroup;

  ngOnInit(): void {
    this.getUserList();
    this.getTweetList();
  }

  async createPost() {
    let post = {
      content: this.post
    }
    try {
      let value = await lastValueFrom(this.userService.createTweet(post))
      this.post = "";
      console.log(value);
      console.log(value)
    } catch (error) {
      console.log(error);
    }
  }

  async getUserList() {
    try {
      let response = await lastValueFrom(this.userService.getUserList())
      console.log('value', response)
      this.users = response?.users;
    } catch (error) {
      console.log(error)
    }

  }

  seeAllUserlist(): void {
    this.isShowAllUserList = true;
  }

  onChildValueUpdated(updatedValue: boolean) {
    this.isShowAllUserList = updatedValue;
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

  viewFollowersList() {
    this.isShowFollersList = true;
    this.isShowAllUserList = false;
    this.isShowFollowingList = false;
  }
  viewFollowingList() {
    this.isShowFollowingList = true;
    this.isShowFollersList = false;
    this.isShowAllUserList = false;
  }

  goToUserProfile(userId: number) {
    this.router.navigate(['home/user', userId]);
  }

  onSubmit() {
    this.searching = true;
    let obj: SearchUser = {
      token: this.searchTerm
    }
    this.searchUser(obj);
    this.searching = false;
  }

  async searchUser(search: SearchUser) {
    try {
      let value = await lastValueFrom(this.userService.searchByUserName(search))
      console.log(value);
      this.searchUserList = value?.search_results;
    } catch (error) {
      console.log(error);
    }
  }


  async getTweetList() {
    try {
      let value = await lastValueFrom(this.userService.getTimeLinePost())
      console.log(value);
      this.tweets = value?.timeline;
    } catch (error) {
      console.log(error);
    }
  }

  goToHomePage(){
    this.isShowAllUserList = false;
    this.isShowFollersList = false;
    this.isShowFollowingList = false;
  }

}
