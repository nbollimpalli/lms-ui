import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.css']
})
export class SearchPopupComponent {
  constructor(public dialogRef: MatDialogRef<SearchPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

}
