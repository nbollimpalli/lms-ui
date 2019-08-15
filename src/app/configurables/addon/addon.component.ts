import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from '../../shared/services/rest.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-addon',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.css']
})
export class AddonComponent implements OnInit {

  priceForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  title = ['A','D','D','O','N'];
  title_logo = 'texture';
  id;
  fid;
  price = {
    'name': ''
  }
  constructor(
                private userService : UserService, 
                private formBuilder: FormBuilder, 
                public loginDialogRef: MatDialogRef<AddonComponent>,
                private snackbarService: SnackbarService,
                private restService: RestService,
                @Inject(MAT_DIALOG_DATA) public data: Object
            )
  {
    console.log('****');
    console.log(data);
    this.id = data['id'];
  }

  ngOnInit() {
    this.setupPrice();
    this.loadPrice();
  }

  setupPrice()
  {
    this.priceForm  =  this.formBuilder.group({
      name: new FormControl(this.price['name'], {validators: [Validators.required]})
    });
  }

  get formControls() { return this.priceForm.controls; }

  onSubmit()
  {
    if(this.priceForm.invalid)
    {
      return;
    }
    else
    {
      this.userService.loading = true;
      var body = this.priceForm.value;
      var destination = 'UPSERT_ADDON';
      if(this.id != null)
      {
        body['id'] = this.id;        
      }
      this.restService.post(destination, null, null, body).subscribe(
        (data) => {
          this.userService.loading = false;
          var emi = {'code' : 'addon', 'data' : {}};
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

  loadPrice()
  {
    if(this.id != null)
    {
      this.restService.get('ADDON', null, {'id' : this.id}).subscribe(
        (data) => {
          this.price = data['data'];
          this.setupPrice();
        }
      );
    }
  }

}


