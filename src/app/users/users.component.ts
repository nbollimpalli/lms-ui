import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'edit', 'delete'];
  dataSource;

  constructor(private firebaseService : FirebaseService) { 
     this.dataSource = this.firebaseService.getUsers();
  }
  
  ngOnInit() {
    
  }

}
