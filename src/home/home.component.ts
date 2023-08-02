import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Follow } from 'src/models/follow.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  post:string='';
  users:User[];
  userFollowStatusMap: { [userId: number]: boolean } = {};
  isShowAllUserList:boolean= false;
  isShowFollowingList:boolean = false;
  isShowFollersList:boolean = false;
  constructor(private formBuilder: FormBuilder,
    private userService:UserService) { 
    console.log('geo to home page');
  }

  postForm: FormGroup;

  ngOnInit(): void {
  this.getUserList();
  }

  async createPost(){
    let post={
      content: this.post
    }
    try{
      let value = await lastValueFrom(this.userService.createTweet(post))
      this.post="";
      console.log(value);
      console.log(value)
      }catch(error){
        console.log(error);
      }
  }

  async getUserList(){
    try{
    let response = await lastValueFrom(this.userService.getUserList())
    console.log('value',response)
    this.users = response?.users;
    }catch(error){
      console.log(error)
    }

  }

  seeAllUserlist():void{
    this.isShowAllUserList = true;
  }

  onChildValueUpdated(updatedValue: boolean){
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

  viewFollowersList(){
    this.isShowFollersList = true;
  }
  viewFollowingList(){
    this.isShowFollowingList = true;
  }

}
