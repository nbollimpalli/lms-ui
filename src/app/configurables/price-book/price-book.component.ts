import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from '../../shared/services/rest.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-price-book',
  templateUrl: './price-book.component.html',
  styleUrls: ['./price-book.component.css']
})
export class PriceBookComponent implements OnInit {

  pricebookForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  title = ['P','R','I','C','E','B','O','O','K'];
  title_logo = 'texture';
  id;
  pricebook = {
    'name': ''
  }
  constructor(
                private userService : UserService, 
                private formBuilder: FormBuilder, 
                public loginDialogRef: MatDialogRef<PriceBookComponent>,
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
    this.setupPriceBook();
    this.loadPriceBook();
  }

  setupPriceBook()
  {
    this.pricebookForm  =  this.formBuilder.group({
      name: new FormControl(this.pricebook['name'], {validators: [Validators.required]})
    });
  }

  get formControls() { return this.pricebookForm.controls; }

  onSubmit()
  {
    if(this.pricebookForm.invalid)
    {
      return;
    }
    else
    {
      this.userService.loading = true;
      var body = this.pricebookForm.value;
      var destination = 'UPSERT_PRICEBOOK';
      if(this.id != null)
      {
        body['id'] = this.id;
      }
      this.restService.post(destination, null, null, body).subscribe(
        (data) => {
          this.userService.loading = false;
          var emi = {'code' : 'pricebook', 'data' : {}};
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

  loadPriceBook()
  {
    if(this.id != null)
    {
      this.restService.get('PRICEBOOK', null, {'id' : this.id}).subscribe(
        (data) => {
          this.pricebook = data['data'];
          this.setupPriceBook();
        }
      );
    }
  }

}

