import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted = false;
  // after the successful login we need to take the user back to where he/she was 
  returnUrl = '';
  constructor(private formBuilder: FormBuilder
    , private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
            // the form is not valid when the email field is not filled

      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    //login.controls.email replacing it with this
    //fc.email
    // snapshot means that latest activatedRoute
    // queryParams means everything after the //?returnUrl=/checkout
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  // getter
  get fc(){
    return this.loginForm.controls;
  }

  //submit method
  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({email:this.fc.email.value,
      password: this.fc.password.value}).subscribe(() => {
        // after the successful login we need to direct the user to the latest url snapshot 
         this.router.navigateByUrl(this.returnUrl);
      });
  }

}
