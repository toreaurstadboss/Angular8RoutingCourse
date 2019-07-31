import { PreloadingStrategy } from "@angular/router";
import { of, Observable } from "rxjs";
import { Route } from "@angular/router";

export class SelectiveStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return fn();
    }
    return of(null);
  }
}
