import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'app/service/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @ViewChild("mySidebar") mySidebar: ElementRef | any;
  constructor(private service: MainService,
              private router: Router
    ) { }

  ngOnInit(): void {
  }
  openNav(){
   this.service.clickToOpen("300px","100px");
  }
}
