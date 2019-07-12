import { Routes } from '@angular/router';

import { AlgoDashboardComponent } from './algo-dashboard/algo-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './auth/user/user.component';
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
import { SettingsComponent } from './settings/settings.component';

export const appRoutes: Routes = [
  { path: '', component: StoresComponent , pathMatch: 'full'},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'store', component: StoreComponent },
  { path: 'store/:id', component: StoreComponent },
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
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: AlgoDashboardComponent }
];
