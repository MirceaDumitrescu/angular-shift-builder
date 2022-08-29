import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddShiftComponent } from './Pages/add-shift/add-shift.component';
import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { ProfileComponent } from './Pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-shift', component: AddShiftComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
