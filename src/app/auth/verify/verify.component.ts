import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from 'src/app/shared/services/rest.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  otp = '';
  constructor(
              public userService : UserService, 
              public loginDialogRef: MatDialogRef<VerifyComponent>,
              private restService : RestService,
              @Inject(MAT_DIALOG_DATA) public data: VerifyComponent
              ) { 
  }

  onNoClick(): void {
    this.loginDialogRef.close();
  }

  ngOnInit() {
    
  }

  requestVerificationOTP()
  {
    this.userService.loading = true;
    this.restService.get( 'REQ_VERIFICATION_OTP', null, null ).subscribe(
      (data) => {
        this.userService.loading = false;
      },
      (data) => {
        this.userService.loading = false;
      }
    );
  }
}
