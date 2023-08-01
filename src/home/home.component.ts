import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  post:string='';
  constructor(private formBuilder: FormBuilder,
    private userService:UserService) { 
    console.log('geo to home page');
  }

  postForm: FormGroup;

  ngOnInit(): void {
  
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

}
