import { Component, OnInit } from "@angular/core";

import { MessageService } from "../../messages/message.service";

import { Product, ProductResolved } from "../product";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"]
})
export class ProductEditComponent implements OnInit {
  pageTitle = "Product Edit";
  errorMessage: string;

  private dataIsValid: { [key: string]: boolean } = {};
  private currentProduct: Product;
  private originalProduct: Product;

  reset(): void {
    this.dataIsValid = null;
    this.currentProduct = null;
    this.originalProduct = null;
  }

  get product(): Product {
    return this.currentProduct;
  }

  get isDirty(): boolean {
    return (JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct));
  }

  set product(value: Product) {
    this.currentProduct = value;
    //Clone the object to retain a copy
    this.originalProduct = { ...value };
  }

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.route.snapshot);
    this.route.data.subscribe(data => {
      const resolvedData: ProductResolved = this.route.snapshot.data[
        "resolvedData"
      ];
      console.log(resolvedData);
      this.errorMessage = resolvedData.error;
      this.product = resolvedData.product;
      this.onProductRetrieved(this.product);
    });
  }

  getProduct(id: number): void {
    this.productService
      .getProduct(id)
      .subscribe(
      (product: Product) => this.onProductRetrieved(product),
      (error: any) => (this.errorMessage = <any>error)
      );
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = "No product found";
    } else {
      if (this.product.id === 0) {
        this.pageTitle = "Add Product";
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService
          .deleteProduct(this.product.id)
          .subscribe(
          () =>
            this.onSaveComplete(`${this.product.productName} was deleted`),
          (error: any) => (this.errorMessage = <any>error)
          );
      }
    }
    this.router.navigateByUrl("/products");
  }

  saveProduct(): void {
    if (true === true) {
      if (this.product.id === 0) {
        this.productService
          .createProduct(this.product)
          .subscribe(
          () =>
            this.onSaveComplete(
              `The new ${this.product.productName} was saved`
            ),
          (error: any) => (this.errorMessage = <any>error)
          );
      } else {
        this.productService
          .updateProduct(this.product)
          .subscribe(
          () =>
            this.onSaveComplete(
              `The updated ${this.product.productName} was saved`
            ),
          (error: any) => (this.errorMessage = <any>error)
          );
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();
    this.router.navigateByUrl("/products");

    // Navigate back to the product list
  }

  isValid(path?: string): boolean {
    console.log("checking");
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true)
    );
  }

  validate(): void {
    this.dataIsValid = {};

    // 'info' tab

    if (
      this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode
    ) {
      this.dataIsValid["info"] = true;
    } else {
      this.dataIsValid["info"] = false;
    }

    // 'tags' tab

    if (this.product.category && this.product.category.length >= 3) {
      this.dataIsValid["tags"] = true;
    } else {
      this.dataIsValid["tags"] = false;
    }
  }
}
