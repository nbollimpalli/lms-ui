import { Offer } from './offer.model';

export class OrderItem {
    Id : string = null;
    Status : String;
    Quantity: number;
    Total: number;
    UnitPrice: number;
    Service = {};
    Addons = [];
    Offers : Offer[] = [];

    constructor(store)
    {
      this.setupNewOrderItem(store)
    }

    setupNewOrderItem(store)
    {
      this.Status = 'pending';
    }

    setupExistingOrderItem(data)
    {
      
    }
}
