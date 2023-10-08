import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  })

  responseData : any = []
  constructor(
    private formBuilder: FormBuilder,
    private service: MainService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  login(){
    if(this.loginForm.valid){
      this.service.login(this.loginForm.value).subscribe(res=>{
        console.log(res)
        this.saveToken(res)
      })
    }
  }

  saveToken(val: any){
    if(this.loginForm != null){
      this.responseData.push(val)
      this.route.navigate(['home'])
      localStorage.setItem('token',val.token);

    }
  }
}
