import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgodexModule } from '@algovent/algodex';
import { FooterComponent } from './naviagators/footer/footer.component';
import { MaterialModule } from './material.module';
import { HeaderNavComponent } from './naviagators/header-nav/header-nav.component';
import { AlgoDashboardComponent } from './configurables/algo-dashboard/algo-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './routes';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './profile/profile/profile.component';
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
import { UsersComponent } from './configurables/users/users.component';
import { StoresComponent } from './configurables/stores/stores.component';
import { StoreComponent } from './configurables/store/store.component';
import { OrdersComponent } from './runtime/orders/orders.component';
import { OrderComponent } from './runtime/order/order.component';
import { AboutComponent } from './company/about/about.component';
import { ContactComponent } from './company/contact/contact.component';
import { FeedbackComponent } from './company/feedback/feedback.component';
import { JobsComponent } from './company/jobs/jobs.component';
import { NewsComponent } from './company/news/news.component';
import { PolicyComponent } from './company/policy/policy.component';
import { ReportsComponent } from './reports/reports.component';
import { SupportComponent } from './company/support/support.component';
import { PageNotFoundComponent } from './company/page-not-found/page-not-found.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { ConnectionService } from 'ng-connection-service';
import { BreakpointObserverService } from './shared/services/breakpoint-observer.service';
import { DialogService } from './shared/services/dialog.service';
import { VerifyComponent } from './auth/verify/verify.component';
import { PermissionsComponent } from './configurables/role-mgmt/permissions/permissions.component';
import { WalletComponent } from './profile/wallet/wallet.component';
import { HistoryComponent } from './profile/history/history.component';
import { UserComponent } from './configurables/user/user.component';
import { AddAddressComponent } from './shared/components/add-address/add-address.component';
import { PricesComponent } from './configurables/prices/prices.component';
import { PriceComponent } from './configurables/price/price.component';
import { FabricComponent } from './configurables/fabric/fabric.component';
import { ClothingsComponent } from './configurables/clothings/clothings.component';
import { ClothingComponent } from './configurables/clothing/clothing.component';
import { ServiceComponent } from './configurables/service/service.component';
import { AddonComponent } from './configurables/addon/addon.component';
import { OrgsComponent } from './configurables/orgs/orgs.component';
import { OrgComponent } from './configurables/org/org.component';
import { UserStoreComponent } from './configurables/user-store/user-store.component';
import { DamagesComponent } from './configurables/damages/damages.component';
import { DamageComponent } from './configurables/damage/damage.component';
import { PriceBooksComponent } from './configurables/price-books/price-books.component';
import { PriceBookComponent } from './configurables/price-book/price-book.component';
import { PriceBookEntriesComponent } from './configurables/price-book-entries/price-book-entries.component';
import { PriceBookEntryComponent } from './configurables/price-book-entry/price-book-entry.component';
import { StoreServicesComponent } from './configurables/store-services/store-services.component';
import { WorkflowsComponent } from './configurables/workflows/workflows.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderNavComponent,
    AlgoDashboardComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
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
    PageNotFoundComponent,
    CustomerHomeComponent,
    VerifyComponent,
    PermissionsComponent,
    WalletComponent,
    HistoryComponent,
    UserComponent,
    AddAddressComponent,
    PricesComponent,
    PriceComponent,
    FabricComponent,
    ClothingsComponent,
    ClothingComponent,
    ServiceComponent,
    AddonComponent,
    OrgsComponent,
    OrgComponent,
    UserStoreComponent,
    DamagesComponent,
    DamageComponent,
    PriceBooksComponent,
    PriceBookComponent,
    PriceBookEntriesComponent,
    PriceBookEntryComponent,
    StoreServicesComponent,
    WorkflowsComponent,
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
  entryComponents: [LoginComponent, SignupComponent, VerifyComponent, AddAddressComponent, PriceComponent, FabricComponent,ClothingComponent,ServiceComponent,AddonComponent,DamageComponent, PriceBookComponent, PriceBookEntryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
