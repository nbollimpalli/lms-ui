import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-algo-dashboard',
  templateUrl: './algo-dashboard.component.html',
  styleUrls: ['./algo-dashboard.component.css'],
})
export class AlgoDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  services_data = [
    {  title: 'Fabric Categories Management', services:
      [
        {
          'title' : 'New Fabric Category',
          'icon' : 'playlist_add',
          'url' : '/fabric-category'
        },
        {
          'title' : 'Fabric Categories',
          'icon' : 'list',
          'url' : '/fabric-categories'
        }, 
      ]
    },
    { title: 'Store Management', services:
      [
        {
          'title' : 'Create New Store',
          'icon' : 'add',
          'url' : '/store'
        },
        {
          'title' : 'Stores',
          'icon' : 'store_mall_directory',
          'url' : '/stores'
        }
      ]
    },
    { title: 'User Management', services :
      [
        {
          'title' : 'Roles and Permissions',
          'icon' : 'lock',
          'url' : '/roles'
        },
        {
          'title' : 'New User',
          'icon' : 'person_add',
          'url' : '/user'
        },
        {
          'title' : 'Employees',
          'icon' : 'people',
          'url' : '/users'
        },
        {
          'title' : 'Customers',
          'icon' : 'people_outline',
          'url' : '/users'
        }
      ]
    },
    { title: 'Discounts', services:
      [
        {
          'title' : 'New Offer',
          'icon' : 'add',
          'url' : '/offer'
        },
        {
          'title' : 'Offers',
          'icon' : 'redeem',
          'url' : '/offers'
        }
      ]
    }
  ];

  position_matrix = {cols: 1, rows: 1};
  
  bk = this.breakpointObserver.observe([Breakpoints.Small]).pipe(
    map(({ matches }) => {
      if (matches) {
        console.log('in small');
        this.setDashBoardLayout(1, 1);
        return;
      }
      console.log('in large');
      this.setDashBoardLayout(3, 1);
      return;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private userService : UserService) {}

  setDashBoardLayout(col: number, row: number) {
    this.position_matrix.cols = col;
    this.position_matrix.rows = row;
    return;
  }
}
