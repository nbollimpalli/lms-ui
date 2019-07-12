import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-ui';
  constructor(private userService : UserService, private router : Router){
    console.log(userService.loggedin);
    if(userService.loggedin === false)
    {
      this.router.navigate['/reports'];
    }
  }
}
