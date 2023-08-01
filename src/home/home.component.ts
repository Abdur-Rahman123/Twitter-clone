import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { 
    console.log('geo to home page');
  }

  ngOnInit(): void {
    console.log('geo to home page');
  }

}
