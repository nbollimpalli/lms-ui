import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { BreakpointObserverService } from '../services/breakpoint-observer.service';
import { Observable } from 'rxjs';
import { Dimension } from '../interfaces/dimension';
import { UserService } from './user.service';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { VerifyComponent } from 'src/app/auth/verify/verify.component';
import { AddAddressComponent } from '../components/add-address/add-address.component';
import { PriceComponent } from '../../configurables/price/price.component';
import { FabricComponent } from '../../configurables/fabric/fabric.component';
import { ClothingComponent } from '../../configurables/clothing/clothing.component';
import { ServiceComponent } from '../../configurables/service/service.component';
import { AddonComponent } from '../../configurables/addon/addon.component';
import { DamageComponent } from 'src/app/configurables/damage/damage.component';
import { PriceBookComponent } from 'src/app/configurables/price-book/price-book.component';
import { PriceBookEntryComponent } from 'src/app/configurables/price-book-entry/price-book-entry.component';

const dialog_sizes = {
    'auth' : {
        'xl' : {'w' : '35vw', 'h' : '30vh'},
        'lg' : {'w' : '40vw', 'h' : '30vh'},
        'md' : {'w' : '45vw', 'h' : '40vh'},
        'sm' : {'w' : '60vw', 'h' : '50vh'},
        'xs' : {'w' : '100vw', 'h' : '70vh'},
    }
}
const commonDimension : Dimension = dialog_sizes['auth']['xl'];

const dialogComponents = {
    'login' : {
        'c' : LoginComponent,
        'd' : commonDimension
    },
    'signup' : {
        'c' : SignupComponent,
        'd' : commonDimension
    },
    'verify' : {
        'c' : VerifyComponent,
        'd' : commonDimension
    },
    'address' : {
      'c' : AddAddressComponent,
      'd' : commonDimension
    },
    'price' : {
      'c' : PriceComponent,
      'd' : commonDimension
    },
    'fabric' : {
      'c' : FabricComponent,
      'd' : commonDimension
    },
    'clothing' : {
      'c' : ClothingComponent,
      'd' : commonDimension
    },
    'service' : {
      'c' : ServiceComponent,
      'd' : commonDimension
    },
    'addon' : {
      'c' : AddonComponent,
      'd' : commonDimension
    },
    'damage' : {
      'c' : DamageComponent,
      'd' : commonDimension
    },
    'pricebook' : {
      'c' : PriceBookComponent,
      'd' : commonDimension
    },
    'pricebookentry' : {
      'c' : PriceBookEntryComponent,
      'd' : commonDimension
    }
  };

@Injectable()
export class DialogService {
  public size$: Observable<string>;
  
  dialogRefs = {}

  constructor(
    public dialog: MatDialog,
    private breakpointObserverService: BreakpointObserverService,
    private userService : UserService
  )
  {
    this.listenToSizeChange();
    this.listenToDialogFeedback();
  }

  listenToSizeChange()
  {
    this.size$ = this.breakpointObserverService.size$;
    this.size$.subscribe(
        (data) => {
            console.log('********************');
            console.log(data);
            commonDimension.w = dialog_sizes['auth'][data]['w'];
            commonDimension.h = dialog_sizes['auth'][data]['h'];
        }
    );
  }

  listenToDialogFeedback()
  {
    this.userService.successEmitter.subscribe(
        (data) => {
            var code = data['code'];
            var action = data['action'];
            this.closeDialog([code]);
            this.performAction(action, data);
            
        }
    );
  }

  performAction(action, data)
  {
    if(action != null)
    {
        var params = data['params'];
        this[action](params);
    }
  }

  openDialog(params): void {
    if(params == null || params.length != 2)
    {
        return;
    }
    var dialogName = params[0];
    var dialogData = params[1];
    // if (params.length == 3)
    // {
    //   var pem = params[2];
    //   if(!this.userService.hasPermission(pem))
    //   {
    //     return;
    //   }
    // }
      const dialogRef = this.dialog.open(dialogComponents[dialogName]['c'], {
      width: dialogComponents[dialogName]['d'].w,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    this.dialogRefs[dialogName] = dialogRef;
  }

  closeDialog(params)
  {
    if(params == null || params.length != 1)
    {
        return;
    }
    var dialogName = params[0];
    var dialogRef = this.dialogRefs[dialogName];
    if(dialogRef != null)
    {
        dialogRef.close();
        
    }
  }
}
