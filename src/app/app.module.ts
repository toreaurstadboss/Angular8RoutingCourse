import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { ProductData } from "./products/product-data";

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";

/* Feature Modules */
import { ProductModule } from "./products/product.module";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./messages/message.module";
import { LoginComponent } from "src/app/user/login.component";
import { ProductListComponent } from "src/app/products/product-list.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    RouterModule.forRoot(
      [
        { path: "welcome", component: WelcomeComponent },
        { path: "login", pathMatch: "full", component: LoginComponent },
        { path: "", redirectTo: "welcome", pathMatch: "full" },
        { path: "**", component: PageNotFoundComponent }
      ],
      { useHash: false }
    ),
    ProductModule,
    UserModule,
    MessageModule
  ],
  declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
