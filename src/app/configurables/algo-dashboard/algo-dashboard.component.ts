import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-algo-dashboard',
  templateUrl: './algo-dashboard.component.html',
  styleUrls: ['./algo-dashboard.component.css'],
})
export class AlgoDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  services_data = [
    { title: 'Org Management', services:
      [
        {
          'title' : 'Create New Org',
          'icon' : 'add',
          'url' : '/org'
        },
        {
          'title' : 'Orgs',
          'icon' : 'domain',
          'url' : '/orgs'
        }
      ]
    },
    {  title: 'Fabrics', services:
      [
        {
          'title' : 'Fabric Types',
          'icon' : 'texture',
          'url' : '/fabrics'
        },
        {
          'title' : 'Addons',
          'icon' : 'playlist_add',
          'url' : '/addons'
        },
        {
          'title' : 'Damages',
          'icon' : 'broken_image',
          'url' : '/damages'
        }
      ]
    },
    { title: 'Pricing', services:
      [
        {
          'title' : 'Prices',
          'icon' : 'money',
          'url' : '/prices'
        },
        {
          'title' : 'Offers',
          'icon' : 'redeem',
          'url' : '/offers'
        }
      ]
    },
    { title: 'User Management', services :
      [
        {
          'title' : 'Groups and Permissions',
          'icon' : 'lock',
          'url' : '/permissions'
        },
        {
          'title' : 'New User',
          'icon' : 'person_add',
          'url' : '/user'
        },
        {
          'title' : 'Employees',
          'icon' : 'people',
          'url' : '/users/staff'
        },
        {
          'title' : 'Customers',
          'icon' : 'people_outline',
          'url' : '/users/customers'
        }
      ]
    },
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
