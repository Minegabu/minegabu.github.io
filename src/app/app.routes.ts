import { Routes } from '@angular/router';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import { HomePageComponent } from './homepage/homepage.component';
export const routes: Routes = [
  { path: 'two-factor-auth', component: TwoFactorAuthComponent },
  { path: '', component: HomePageComponent },
];
