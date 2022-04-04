import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  records: any = [];
  constructor(public service : MainService) {}

  ngOnInit(): void {
    this.service.getData().subscribe((response) =>{
    this.records.push(response)
     });
    }
  }
