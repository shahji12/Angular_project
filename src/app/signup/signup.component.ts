import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = this.formBuilder.group({
    name : [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required]
  })
  formSubmitted : boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service : MainService,
    // private Toastr : ToastrService
  ) { }

  signUp(){
    this.formSubmitted = true;
    return this.service.registration(this.signupForm.value).subscribe(res=>{
      console.log(res)
      this.signupForm.reset();
    })

  }
  ngOnInit(): void {
  }

}

