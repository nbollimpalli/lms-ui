import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-algo-dashboard',
  templateUrl: './algo-dashboard.component.html',
  styleUrls: ['./algo-dashboard.component.css'],
})
export class AlgoDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  orders_chart;
  shop_revenue_chart;
  fromDate : Date;
  toDate : Date;
  shops_fc = new FormControl();
  order_stat_fc = new FormControl();
  shops_selection = ['All'];
  order_stat_selection = ['All'];
  constructor() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.fromDate.setDate(this.fromDate.getDate()-1);
  }

  setDashBoardLayout(col: number, row: number) {
    return;
  }

  ngOnInit(){
    this.loadDashBoard();
  }

  loadDashBoard()
  {
    this.loadOrders();
    this.loadShopRevenue();
  }
  labels = ['Shop A', 'Shop B', 'Shop C', 'Shop D', 'Shop E', 'Shop F', 'Shop G', 'Shop H'];
  order_status = ['Orders recieved', 'Orders In Progress', 'Completed Orders', 'Order Delivered'];
  loadShopRevenue()
  {
    this.shop_revenue_chart = new Chart('shops-revenue', {
      type: 'doughnut',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Shops Revenue'
        },
      },
      data: {
          labels: this.labels,
          datasets: [{
              data: [10, 20, 30, 50, 20, 25, 12, 34],
              backgroundColor: [
                "#FAEBD7",
                "#DCDCDC",
                "#E9437A",
                "#E9968B",
                "#E9957C",
                "#E9976A",
                "#E9697A",
                "#E6997A"
              ]
          }]
      }
    }
    );
  }

  loadOrders()
  {
    this.orders_chart = new Chart('orders', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Orders Report'
        },
      },
      data: {
        labels: this.labels,
        datasets: [
          {
            type: 'bar',
            label: 'Orders recieved',
            data: [243, 156, 365, 30, 156, 265, 356, 543],
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          },
          {
            type: 'bar',
            label: 'Orders Delivered',
            data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            fill: false,
          },
          {
            type: 'bar',
            label: 'Orders In Progress',
            data: [47, 180, 190, 40, 36, 15, 6, 900].reverse(),
            backgroundColor: 'rgba(128,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            fill: false,
          }
        ]
      }
    });
  }
}
