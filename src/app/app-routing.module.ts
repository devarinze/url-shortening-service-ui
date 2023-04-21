import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./public/login/login.component";
import {NotFoundComponent} from "./public/not-found/not-found.component";
import {RedirectComponent} from "./public/redirect/redirect.component";
import {AuthGuard} from "./core/services/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'app',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    canActivate: [AuthGuard]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: RedirectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
