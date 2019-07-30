import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./home/welcome.component";
import { LoginComponent } from "./user/login.component";
import { PageNotFoundComponent } from "./page-not-found.component";
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: 'welcome', component: WelcomeComponent },
        { path: "login", pathMatch: "full", component: LoginComponent },
        { path: "", redirectTo: "welcome", pathMatch: "full" },
        { path: "**", component: PageNotFoundComponent }
      ],
      { useHash: false, enableTracing: false }
    ),
  ],
  exports: [ RouterModule],
})
export class AppRoutingModule {}
