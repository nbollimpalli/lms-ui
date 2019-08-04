import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import { SnackbarService } from '../../shared/services/snackbar.service';


export interface PricingItem {
  name: string;
  price: number;
}

export interface OrderItem {
  index : number;
  quantity: number;
  price: PricingItem[];
  total: number;
  unitprice: number;
}

export interface Order {
  total: number;
  userid: string;
  storeid: string;
  orderItems: OrderItem[];
  orderid: string;
  status: string;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  storeForm: FormGroup;
  pricingForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  displayedColumns: string[] = ['name', 'email', 'role', 'edit', 'delete'];
  dataSource;
  storeid;
  store;
  edit = true;
  pricing = {};
  orders : Order[] = [];

  constructor(private firebaseService : FirebaseService, private route : ActivatedRoute, private formBuilder: FormBuilder, private router : Router, private snackbacr : SnackbarService) {
    this.dataSource = this.firebaseService.getUsers();
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.storeid = params.get('id');
      if(this.storeid === null)
      {
        this.edit = false;
      }
    });
    this.loadStore();
    this.getOrders();
  }

  loadStore()
  {
    this.pricingForm  =  this.formBuilder.group({
      name: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
      price: new FormControl('', {validators: [Validators.required, Validators.min(1)]} ),
    });
    this.storeForm  =  this.formBuilder.group({
      name: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
      phone: new FormControl('', {validators: [Validators.required]} ),
      address: new FormControl('', {validators: [Validators.required]} )
    });
    if(this.edit)
    {
      this.firebaseService.get('stores', this.storeid).subscribe(
        (data) => {
          var payloadData = data.payload.data();
          this.storeForm  =  this.formBuilder.group({
            name: new FormControl(payloadData['name'], {validators: [Validators.required], updateOn: 'blur'}),
            phone: new FormControl(payloadData['phone'], {validators: [Validators.required]} ),
            address: new FormControl(payloadData['address'], {validators: [Validators.required]} )
          });
          this.pricing = payloadData['pricing'];
          if(this.pricing == null || this.pricing === undefined)
          {
            this.pricing = {};
          }
        }
      ); 
    }
  }

  onStoreSubmit()
  {
    if(this.edit)
    {
      this.onStoreUpdate();
    }
    else
    {
      this.onStoreCreate();
    }
  }

  onStoreUpdate()
  {
    if(this.storeForm.invalid)
    {
      return;
    }
    else
    {
      var st = this.firebaseService.update('stores', this.storeid, this.storeForm.value)
        .then(
          (data) => {
            this.snackbacr.show_snackbar('store details updated successfully');
          }
        );
    }
  }

  onStoreCreate()
  {
    if(this.storeForm.invalid)
    {
      return;
    }
    else
    {
      var storeData = this.storeForm.value;
      storeData['pricing'] = {};
      this.firebaseService.create('stores', storeData)
      .then(
        (data) => {
          this.router.navigate(['/store/'+data.id]);
          this.snackbacr.show_snackbar('store got created successfully');
        }
      )

    }
  }

  addPrice()
  {
    if(this.edit)
    {
      var pricingKeyVal = this.pricingForm.value;
      var name = pricingKeyVal['name'];
      var price = pricingKeyVal['price'];
      this.pricing[name] = {'name' : name, 'price' : price};
      var storedata = this.storeForm.value;
      storedata['pricing'] = this.pricing;
      console.log(storedata);
      this.firebaseService.update('stores', this.storeid, this.storeForm.value)
        .then(
          (data) => {
            this.snackbacr.show_snackbar('pricing for store updated successfully');
            this.pricingForm.reset();
            this.pricingForm.clearValidators();
          }
        );
    }
    else
    {
      this.snackbacr.show_snackbar('Please create store before adding pricing');
    }
  }

  getOrders()
  {
    if(this.edit)
    {
      this.firebaseService.getAll('orders')
        .subscribe(
          (data) => {
            console.log(data);
            for (var _i = 0; _i < data.length; _i++) {
              var order = data[_i];
              var orderData = order.payload.doc.data();
              console.log(orderData);
              console.log('************');
              console.log(orderData);
              console.log('************');
              var newOrder : Order = {
                orderid : order.payload.doc.id,
                total: orderData['total'],
                userid: orderData['userid'],
                storeid: orderData['storeid'],
                orderItems: orderData['orderItems'],
                status: orderData['status']
              };
              if(newOrder.storeid === this.storeid)
              {
                this.orders.push(newOrder);
              }
              console.log('next');
            }
            console.log(this.orders);
          }
        );
    }
  }

  

}
