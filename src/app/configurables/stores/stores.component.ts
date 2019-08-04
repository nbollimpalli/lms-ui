import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from '../../shared/services/firebase.service';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  constructor(private firebaseService : FirebaseService) { }
  shops_fc = new FormControl();
  shops_selection = ['All'];
  stores;
  ngOnInit() {
    this.firebaseService.getAll('stores').subscribe(
      (data) => {
        this.stores = data;
        console.log(this.stores);
      }
    );
  }

}
