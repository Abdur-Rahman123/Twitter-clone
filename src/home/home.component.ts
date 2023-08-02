import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
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
  isShowAllUserList:boolean= false;
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

}
