import { NgModule } from "@angular/core";
import { ProductResolverService } from "./product-resolver.service";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";

import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { ProductEditInfoComponent } from "./product-edit/product-edit-info.component";
import { ProductEditTagsComponent } from "./product-edit/product-edit-tags.component";
import { AuthGuard } from "src/app/user/auth.guard";
import { ProductEditGuard } from "src/app/products/product-edit.guard";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: "products",
        canActivate: [AuthGuard],
        children: [
          { path: "", component: ProductListComponent },
          {
            path: ":id",
            component: ProductDetailComponent,
            resolve: { resolvedData: ProductResolverService }
          },
          {
            path: ":id/edit",
            component: ProductEditComponent,
            canDeactivate: [ProductEditGuard],
            resolve: { resolvedData: ProductResolverService },
            children: [
              { path: "", redirectTo: "info", pathMatch: "full" },
              { path: "info", component: ProductEditInfoComponent },
              { path: "tags", component: ProductEditTagsComponent }
            ]
          }
        ]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductDetailComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
