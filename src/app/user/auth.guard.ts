import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/auth.service";
import { Router } from "@angular/router";
import { Route } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: {}): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    console.log("checking logged in");
    if (this.authService.isLoggedIn) return true;
    this.authService.redirectUrl = url;
    this.router.navigate(["/login"]);
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }
}
