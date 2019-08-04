import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgodexModule } from '@algovent/algodex';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material.module';
import { SearchPopupComponent } from './shared/components/search-popup/search-popup.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { AlgoDashboardComponent } from './algo-dashboard/algo-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './routes';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './auth/user/user.component';
import { UserService } from './shared/services/user.service';
import { RestService } from './shared/services/rest.service';
import { ApiFactoryService } from './shared/services/api-factory.service';
import { FileManagerService } from './shared/services/file-manager.service';
import { AuthService } from './shared/services/auth.service';
import { SearchService } from './shared/services/search.service';
import { SeoService } from './shared/services/seo.service';
import { SnackbarService } from './shared/services/snackbar.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './shared/services/firebase.service';
import { ShowErrorsComponent } from './shared/services/show-errors/show-errors.component';
import { UsersComponent } from './users/users.component';
import { StoresComponent } from './stores/stores.component';
import { StoreComponent } from './store/store.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { JobsComponent } from './jobs/jobs.component';
import { NewsComponent } from './news/news.component';
import { PolicyComponent } from './policy/policy.component';
import { ReportsComponent } from './reports/reports.component';
import { SupportComponent } from './support/support.component';
import { FabricCatsComponent } from './fabric-cats/fabric-cats.component';
import { FabricCatComponent } from './fabric-cat/fabric-cat.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { ConnectionService } from 'ng-connection-service';
import { BreakpointObserverService } from './shared/services/breakpoint-observer.service';
import { DialogService } from './shared/services/dialog.service';
import { VerifyComponent } from './auth/verify/verify.component';
import { PermissionsComponent } from './role-mgmt/permissions/permissions.component';
import { RolesComponent } from './role-mgmt/roles/roles.component';
import { WalletComponent } from './wallet/wallet.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SearchPopupComponent,
    HeaderNavComponent,
    AlgoDashboardComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    ShowErrorsComponent,
    UsersComponent,
    StoresComponent,
    StoreComponent,
    OrdersComponent,
    OrderComponent,
    AboutComponent,
    ContactComponent,
    FeedbackComponent,
    JobsComponent,
    NewsComponent,
    PolicyComponent,
    ReportsComponent,
    SupportComponent,
    FabricCatsComponent,
    FabricCatComponent,
    PageNotFoundComponent,
    CustomerHomeComponent,
    VerifyComponent,
    RolesComponent,
    PermissionsComponent,
    WalletComponent,
    HistoryComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AlgodexModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [BreakpointObserverService, DialogService, SnackbarService, FirebaseService, UserService, RestService, ApiFactoryService, FileManagerService, AuthService, SearchService, SeoService, ConnectionService],
  entryComponents: [SearchPopupComponent, LoginComponent, SignupComponent, VerifyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
