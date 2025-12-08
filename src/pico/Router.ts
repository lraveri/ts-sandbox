import { HttpMethod } from './types';
import { PicoRequest, PicoResponse, MiddlewareFunction } from './types';

export type RouteHandler = MiddlewareFunction;

export interface Route {
  method: HttpMethod;
  path: string;
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];

  public add(method: HttpMethod, path: string, handler: RouteHandler): void {
    this.routes.push({ method, path, handler });
  }

  public get(path: string, handler: RouteHandler): void {
    this.add('GET', path, handler);
  }

  public post(path: string, handler: RouteHandler): void {
    this.add('POST', path, handler);
  }

  public put(path: string, handler: RouteHandler): void {
    this.add('PUT', path, handler);
  }

  public delete(path: string, handler: RouteHandler): void {
    this.add('DELETE', path, handler);
  }

  public match(method: string, path: string): Route | undefined {
    return this.routes.find(route => 
      route.method === method && this.matchPath(route.path, path)
    );
  }

  private matchPath(routePath: string, requestPath: string): boolean {
    // Per ora facciamo un match esatto, implementeremo i parametri dopo
    return routePath === requestPath;
  }
}