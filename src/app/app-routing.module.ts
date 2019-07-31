import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./home/welcome.component";
import { LoginComponent } from "./user/login.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { AuthGuard } from "src/app/user/auth.guard";
import { PreloadAllModules } from "@angular/router";
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: 'welcome', component: WelcomeComponent },
        { path: 'products', loadChildren: './products/product.module#ProductModule', canActivate: [AuthGuard], data: { preload: true } },
        { path: 'login', pathMatch: 'full', component: LoginComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }
      ],
      { useHash: false, enableTracing: false, preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
