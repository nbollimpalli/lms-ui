import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})


export class OrderComponent implements OnInit {
  storeid;
  orderid;
  edit = true;
  storedata;
  customerData;
  order : Order;
  currentItemNumber = 0;
  cemail = '';

  constructor(private route : ActivatedRoute, private formBuilder: FormBuilder, private router : Router, private snackbar : SnackbarService) { 
    this.order = new Order('');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.storeid = params.get('storeid');
      if(this.storeid === null)
      {
        this.edit = false;
      }
      this.orderid = params.get('id');
      if(this.orderid === null)
      {
        this.edit = false;
      }
    });
    this.loadOrder();
  }

  loadOrder()
  {
    
  }

  onOrderSubmit()
  {
    
  }

  

  onCustomerEmailUpdate(cmail)
  {
    
  }

  reset()
  {
    var url = '/store/'+this.storeid;
    this.router.navigate([url]);
  }

  isValidMailFormat(email){
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if ( email === null || email === undefined || email === '' ||  email.length <= 5 || !EMAIL_REGEXP.test(email) ) {
        return false;
    }
    return true;
  }

}
