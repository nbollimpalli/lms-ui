import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();

  social_logins = [
    'Facebook',
    'Google',
    'Twitter',
    'Linked-In'
  ]

  img_icon_data = {
    'Facebook' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-facebook.svg',
    'Twitter' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-twitter.svg',
    'Linked-In' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-linkedin.svg',
    'Google' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-google.svg'
  };
  userService;
  constructor(private userServicex : UserService, private formBuilder: FormBuilder, private snackbarService : SnackbarService, private router : Router, private firebaseService : FirebaseService) { 
    this.userService = userServicex;
  }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
      password: new FormControl('', {validators: [Validators.required]} )
    });
    console.log(this.loginForm);
  }

  get formControls() { return this.loginForm.controls; }

  ngOnDestroy() {
    this.userService.setUserState('any');
  }

  onSubmit()
  {
    if(this.loginForm.invalid)
    {
      return;
    }
    else
    {
      this.firebaseService.getLoggedInUser(this.loginForm.value.email).subscribe(
        (data) => {
          //data.docs[0].data()
          if(data.size > 0)
          {
            this.userService.fuser = data.docs[0];
            if(this.userService.fuser.data()['password'] === this.loginForm.value['password'])
            {
              this.userService.loggedin = true;
              localStorage.setItem('token', this.userService.fuser.id);
              this.snackbarService.show_snackbar('Successfully loggedin');
              this.router.navigate(['/']);
            }
            else
            {
              this.snackbarService.show_snackbar('Invalid password');
            }
          }
          else
          {
            this.snackbarService.show_snackbar('Email not found');            
          }
        }
      );
      // this.userService.loginUser(this.loginForm.value).subscribe(
      //   (data) => {
      //     this.snackbarService.afterRequest(data);
      //     this.afterLogin(data);
      //   },
      //   (data) => {
      //     this.snackbarService.afterRequestFailure(data);
      //   }
      // );
    }
  }

  afterLogin(data)
  {
    var token = data['data']['token'];
    this.userService.afterLogin(token);
    this.router.navigate(['']);
    this.snackbarService.afterRequest(data);
  }

}
