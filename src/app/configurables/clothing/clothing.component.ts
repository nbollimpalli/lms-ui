import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from '../../shared/services/rest.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.css']
})
export class ClothingComponent implements OnInit {

  priceForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  id;
  fid;
  price = {
    'name': ''
  }
  constructor(
                private userService : UserService, 
                private formBuilder: FormBuilder, 
                public loginDialogRef: MatDialogRef<ClothingComponent>,
                private snackbarService: SnackbarService,
                private restService: RestService,
                @Inject(MAT_DIALOG_DATA) public data: Object
            )
  {
    console.log('****');
    console.log(data);
    this.id = data['id'];
    this.fid = data['fid'];
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
      var destination = 'UPSERT_CLOTHING';
      body['fabric'] = this.fid;
      console.log()
      if(this.id != null)
      {
        body['id'] = this.id;        
      }
      this.restService.post(destination, null, null, body).subscribe(
        (data) => {
          this.userService.loading = false;
          var emi = {'code' : 'clothing', 'data' : {}};
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
      this.restService.get('CLOTHING', null, {'id' : this.id}).subscribe(
        (data) => {
          this.price = data['data'];
          this.setupPrice();
        }
      );
    }
  }

}


