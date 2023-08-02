import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  users: User[];
  @Output() isShowAllUserList = new EventEmitter<boolean>();
  @Input('userlist')
  set userlist(v: User[]) {
    if (!v) return;
    this.users = v;
  }
  constructor() { }

  ngOnInit(): void {
  }

  backToNewsFeed():void{
  this.isShowAllUserList.emit(false);
  }

}
