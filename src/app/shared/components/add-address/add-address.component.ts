import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from '../../services/rest.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  addressForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  id;
  user_id;
  store_id;
  org_id;
  address = {
    'name': 'Default',
    'flat': '',
    'landmark': '',
    'street': '',
    'area': '',
    'zipcode': '',
    'city': 'Bangalore',
    'state': 'Karnataka',
    'country': 'India'
  }
  constructor(
                private userService : UserService, 
                private formBuilder: FormBuilder, 
                public loginDialogRef: MatDialogRef<AddAddressComponent>,
                private snackbarService: SnackbarService,
                private restService: RestService,
                @Inject(MAT_DIALOG_DATA) public data: Object
            )
  {
    console.log('****');
    console.log(data);
    this.id = data['id'];
    this.user_id = data['user_id'];
    this.store_id = data['store_id'];
    this.org_id = data['org_id'];
  }

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

  ngOnInit() {
    this.setupAddress();
    this.loadAddress();
  }

  setupAddress()
  {
    this.addressForm  =  this.formBuilder.group({
      name: new FormControl(this.address['name'], {validators: [Validators.required]}),
      flat: new FormControl(this.address['flat'], {validators: [Validators.required]}),
      landmark: new FormControl(this.address['landmark'], {validators: []} ),
      street: new FormControl(this.address['street'], {validators: [Validators.required]} ),
      area: new FormControl(this.address['area'], {validators: [Validators.required]} ),
      zipcode: new FormControl(this.address['zipcode'], {validators: [Validators.required]} ),
      city: new FormControl('Bangalore', {validators: [Validators.required]} ),
      state: new FormControl('Karnataka', {validators: [Validators.required]} ),
      country: new FormControl('India', {validators: [Validators.required]} )
    });
  }

  get formControls() { return this.addressForm.controls; }

  onSubmit()
  {
    if(this.addressForm.invalid)
    {
      return;
    }
    else
    {
      this.userService.loading = true;
      var body = this.addressForm.value;
      var destination = 'UPSERT_ADDRESS';
      if(this.id != null)
      {
        body['address_id'] = this.id;
      }
      if(this.user_id != null)
      {
        body['user_id'] = this.user_id;
        destination = 'U_UPSERT_ADDRESS';
      }
      if(this.store_id != null)
      {
        body['store_id'] = this.store_id;
        destination = 'S_UPSERT_ADDRESS';
      }
      if(this.org_id != null)
      {
        body['org_id'] = this.org_id;
        destination = 'O_UPSERT_ADDRESS';
      }
      this.restService.post(destination, null, null, body).subscribe(
        (data) => {
          this.userService.loading = false;
          var emi = {'code' : 'address', 'data' : {}};
          this.userService.successEmitter.emit(emi);
          this.snackbarService.afterRequest(data);
        },
        (data) => {
          this.userService.loading = false;
          this.snackbarService.afterRequestFailure(data);
        }
      );
    }
  }

  loadAddress()
  {
    if(this.id != null)
    {
      this.restService.get('ADDRESS', null, {'id' : this.id, 'user_id' : this.user_id, 'store_id' : this.store_id, 'org_id' : this.org_id}).subscribe(
        (data) => {
          this.address = data['data'];
          this.setupAddress();
        }
      );
    }
  }

}

