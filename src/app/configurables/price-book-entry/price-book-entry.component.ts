import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from '../../shared/services/rest.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-price-book-entry',
  templateUrl: './price-book-entry.component.html',
  styleUrls: ['./price-book-entry.component.css']
})
export class PriceBookEntryComponent implements OnInit {

  pricebookentryForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  title = ['A','M','O','U','N','T'];
  title_logo = 'texture';
  amount = 0;
  constructor(
                private userService : UserService, 
                private formBuilder: FormBuilder, 
                public loginDialogRef: MatDialogRef<PriceBookEntryComponent>,
                private snackbarService: SnackbarService,
                private restService: RestService,
                @Inject(MAT_DIALOG_DATA) public data: Object
            )
  {
    console.log('****');
    console.log(data);
    this.amount = data['initial_amount'];
  }

  ngOnInit() {
    this.setupPriceBookEntry();
  }

  setupPriceBookEntry()
  {
    this.pricebookentryForm  =  this.formBuilder.group({
      amount: new FormControl(this.amount, {validators: [Validators.required]})
    });
  }

  get formControls() { return this.pricebookentryForm.controls; }

  onSubmit()
  {
    if(this.pricebookentryForm.invalid)
    {
      return;
    }
    else
    {
      this.userService.loading = true;
      var body = this.pricebookentryForm.value;
      var destination = 'UPSERT_PRICEBOOK_ENTRY';
      this.data['amount'] = this.pricebookentryForm.value['amount'];
      this.restService.post(destination, null, null, this.data).subscribe(
        (data) => {
          this.userService.loading = false;
          var emi = {'code' : 'pricebookentry', 'data' : {}};
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

}


