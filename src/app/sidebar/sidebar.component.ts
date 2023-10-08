import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'app/service/main.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild("mySidebar") mySidebar: ElementRef | any;
  @ViewChild("main") main: ElementRef | any;

  constructor( private service : MainService,
              private router: Router) { }

  ngOnInit(): void {
    this.service.openSidebar$.subscribe(response => {
      this.mySidebar.nativeElement.style.width = response;
    })
  }

closeNav() {
  // this.mySidebar.nativeElement.style.width = "0";
  this.service.clickToOpen("0","0");
}
logout(){
  this.service.logOut();
    this.router.navigate(['/login']);
}
}
