import { Routes } from '@angular/router';

import { AlgoDashboardComponent } from './configurables/algo-dashboard/algo-dashboard.component';
import { ProfileComponent } from './profile/profile/profile.component';
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
import { PermissionsComponent } from './configurables/role-mgmt/permissions/permissions.component';
import { RolesComponent } from './configurables/role-mgmt/roles/roles.component';
import { WalletComponent } from './profile/wallet/wallet.component';
import { HistoryComponent } from './profile/history/history.component';
import { UserComponent } from './configurables/user/user.component';
import { PricesComponent } from './configurables/prices/prices.component';

import { FabricsComponent } from './configurables/fabrics/fabrics.component';
import { ClothingsComponent } from './configurables/clothings/clothings.component';
import { ServicesComponent } from './configurables/services/services.component';
import { AddonsComponent } from './configurables/addons/addons.component';

import { OrgsComponent } from './configurables/orgs/orgs.component';
import { OrgComponent } from './configurables/org/org.component';

export const appRoutes: Routes = [
  { path: '', component: CustomerHomeComponent , pathMatch: 'full'},
  { path: 'dashboard', component: AlgoDashboardComponent },
  { path: 'chome', component: CustomerHomeComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'users/:type', component: UsersComponent },
  { path: 'user', component: UserComponent },
  { path: 'org/:org_id/user', component: UserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'org/:org_id/user/:id', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'org/:org_id/store', component: StoreComponent },
  { path: 'org/:org_id/store/:id', component: StoreComponent },
  { path: 'orgs', component: OrgsComponent },
  { path: 'org', component: OrgComponent },
  { path: 'org/:id', component: OrgComponent },
  { path: 'fabrics', component: FabricsComponent },
  { path: 'fabric/:fid/clothings', component: ClothingsComponent },
  { path: 'fabric/:fid/clothing/:cid/services', component: ServicesComponent },
  { path: 'addons', component: AddonsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'store/:storeid/order', component: OrderComponent },
  { path: 'store/:storeid/order/:id', component: OrderComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'support', component: SupportComponent },
  { path: '404', component: PageNotFoundComponent },  
  { path: '**', component: PageNotFoundComponent }
];
