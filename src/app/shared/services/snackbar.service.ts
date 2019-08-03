import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar)
  {

  }

  load()
  {
  }

  calm()
  {
  }

  show_snackbar(message)
  {
    var action = 'X';
    let snack_bar = this.snackBar.open(message, action, {
      verticalPosition : 'top',
      horizontalPosition: 'right',
    });
  }

  afterRequestFailure(data)
  {
    this.calm();
    var messages = data['error'];
    console.log(data);
    
    if(messages)
    {
      if(messages['messages'] == null)
      {
        this.show_snackbar(messages['detail']);
      }
      else
      {
        messages = messages['messages'];
      }
    }
    if(messages && messages.length > 0)
    {
     
      this.show_snackbar(messages.join(','));
    }
  }

  afterRequest(data)
  {
    this.calm();
    if(data['messages'] && data['messages'].length > 0)
    {
      this.show_snackbar(data['messages'].join(','));
    }
  }
}
