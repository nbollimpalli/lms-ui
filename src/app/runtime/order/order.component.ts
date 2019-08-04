import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
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
  status: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})


export class OrderComponent implements OnInit {

  constructor(private firebaseService : FirebaseService, private route : ActivatedRoute, private formBuilder: FormBuilder, private router : Router, private snackbar : SnackbarService) { }
  pricingItems: PricingItem[] = [];
  storeid;
  orderid;
  edit = true;
  storedata;
  customerData;
  orderItems : OrderItem[] = [];
  order : Order;
  currentItemNumber = 0;
  cemail = '';

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
    this.order = { total: 0, storeid: this.storeid, orderItems: this.orderItems, userid: null, status: 'pending' };
    this.addNewOrderItem();
    this.firebaseService.get('stores', this.storeid).subscribe(
      (data) => {
        this.storedata = data.payload.data();
        this.storeid = data.payload.id;
        var pdata = this.storedata['pricing'];
        if(pdata != null)
        {
          for (var key in pdata)
          {
            var pricingItem : PricingItem = pdata[key];
            this.pricingItems.push(pricingItem);
          }
        }
        console.log(this.orderItems);
      }
    );
    if(this.edit)
    {
       this.firebaseService.get('orders', this.orderid).subscribe(
         (data) => {
           console.log(data);
           this.orderid = data.payload.id;
           var orderData = data.payload.data();
           this.order.total = orderData['total'],
           this.order.userid = orderData['userid'],
           this.order.storeid = orderData['storeid'],
           this.order.orderItems = orderData['orderItems'],
           this.order.status= orderData['status']
           this.loadUser(this.order.userid);
           this.orderItems = this.order.orderItems;
           this.currentItemNumber = (new Date()).getTime();
         }
       );
    }
  }

  onOrderSubmit()
  {
    if(this.order.total == 0)
    {
      alert("please add order details");
      this.snackbar.show_snackbar("please add order details");
      return;
    }
    if(this.edit)
    {
      this.onOrderUpdate();
    }
    else
    {
      this.onOrderCreate();
    }
  }

  addNewOrderItem()
  {
    this.currentItemNumber += 1;
    var orderItem : OrderItem = {quantity: 0, price: [], total: 0, unitprice: 0, index: this.currentItemNumber};
    this.orderItems.push(orderItem);
  }

  deleteOrderItem(orderItem : OrderItem)
  {
    if(this.orderItems.length <= 1)
    {
      alert('order item cannot be deleted');
      return;
    }
    this.orderItems = this.orderItems.filter(oi => oi.index !== orderItem.index);
    console.log(this.orderItems);
    this.updateOrderTotal();
  }

  increaseQuantity(orderItem : OrderItem)
  {
    orderItem.quantity += 1;
    this.updateOrderItemTotal(orderItem);
    this.updateOrderTotal();
  }

  decreaseQuantity(orderItem : OrderItem)
  {
    orderItem.quantity -= 1;
    this.updateOrderItemTotal(orderItem);
    this.updateOrderTotal();
  }

  addPricing(orderItem : OrderItem, pricingItem : PricingItem)
  {
    for(let oiPricing of orderItem.price)
    {
      if(oiPricing.name == pricingItem.name)
      {
        this.snackbar.show_snackbar('This service already added, please select different one');
        return;
      }
    }
    var newPricingItem : PricingItem = { name: pricingItem.name, price: pricingItem.price };
    orderItem.price.push(newPricingItem);
    this.updateOrderItemTotal(orderItem);
    this.updateOrderTotal();
    console.log(this.order);
  }

  deletePricing(orderItem : OrderItem, pricingItem : PricingItem)
  {
    orderItem.price = orderItem.price.filter(priceItem => priceItem.name !== pricingItem.name);
    this.updateOrderItemTotal(orderItem);
    this.updateOrderTotal();
  }

  updateOrderItemTotal(orderItem : OrderItem)
  {
    var unitprice = 0;
    for(let pricingItem of orderItem.price)
    {
      unitprice += pricingItem.price; 
    }
    orderItem.total = orderItem.quantity * unitprice;
    orderItem.unitprice = unitprice;
  }

  updateOrderTotal()
  {
    var total = 0;
    for(let orderItem of this.orderItems)
    {
      total = total + orderItem.total;
    }
    this.order.orderItems = this.orderItems;
    this.order.total = total;
  }

  loadUser(email : string)
  {
    if(this.edit)
    {
      this.firebaseService.get('users', this.order.userid).subscribe(
        (data) => {
          console.log('***');
          console.log(data.payload.data());
          this.cemail = data.payload.data()['email'];
        }
      );
    }
  }

  onOrderCreate()
  {
    this.firebaseService.create('orders', this.order)
    .then(
      (data) => {
        this.orderid = data.id;
        this.router.navigate(['/store/'+this.storeid+'/order/'+this.orderid]);
        this.snackbar.show_snackbar('Order got created successfully');
      }
    );
  }

  onOrderUpdate()
  {
    this.firebaseService.update('orders', this.orderid, this.order)
    .then(
      (data) => {
        this.router.navigate(['/store/'+this.storeid]);
        this.snackbar.show_snackbar('Order got updated successfully');
      }
    );
  }

  onCustomerEmailUpdate(cmail)
  {
    // this.snackbar.show_snackbar('please enter a valid email address');
    if(!this.isValidMailFormat(cmail))
    {
      alert('please enter a valid email address');
      return;
    }
    this.firebaseService.getLoggedInUser(cmail).subscribe(
      (data) => {
        if(data.size > 0)
        {
          var customer = data.docs[0];
          this.order.userid = customer.id;
          this.snackbar.show_snackbar('Existing Customer');
        }
        else
        {
          var tempAccount = {
            email: cmail,
            mobile: '',
            name: 'Customer',
            nameTosearch: 'customer',
            password: 'default',
            role: 'Customer'
          };
          this.firebaseService.create('users', tempAccount)
          .then(
            (data) => {
              this.order.userid = data.id;
              this.snackbar.show_snackbar('customer user account got created');
            }
          )  
        }
      }
    );
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
