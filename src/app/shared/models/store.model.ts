export class Order {
    Id : string = null;
    Status : String;
    OrderItems : OrderItem[] = [];
    Customer : User;

    constructor(store)
    {
      this.setupNewOrder(store)
    }

    setupNewOrder(store)
    {
      this.Store = store;
      this.Status = 'pending';
    }

    setupExistingOrder(data)
    {
      
    }

    addNewOrderItem()
    {
      
    }

    deleteOrderItem(orderItem : OrderItem)
    {
      
    }

    increaseQuantity(orderItem : OrderItem)
    {
      
    }

    decreaseQuantity(orderItem : OrderItem)
    {
      
    }

    updateOrderItemTotal(orderItem : OrderItem)
    {
      
    }

    updateOrderTotal()
    {
      
    }
}
