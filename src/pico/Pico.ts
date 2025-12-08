import { Server, createServer, IncomingMessage, ServerResponse } from 'http';
import { Router, RouteHandler, HttpMethod } from './Router';
import { MiddlewareChain } from './MiddlewareChain';
import { MiddlewareFunction, ErrorMiddlewareFunction } from './types';

export class Pico {
  private server: Server;
  private router: Router;
  private middlewareChain: MiddlewareChain;

  constructor() {
    this.router = new Router();
    this.middlewareChain = new MiddlewareChain();
    this.server = createServer(this.handleRequest.bind(this));
  }

  private async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const method = req.method || 'GET';
    const url = req.url || '/';

    // Aggiungiamo il route handler come ultimo middleware
    const route = this.router.match(method, url);
    if (route) {
      this.middlewareChain.use(route.handler);
    } else {
      this.middlewareChain.use((_, res) => {
        res.statusCode = 404;
        res.json({ 
          error: 'Not Found',
          message: `Cannot ${method} ${url}`
        });
      });
    }

    // Eseguiamo la catena dei middleware
    await this.middlewareChain.execute(req, res);
  }

  public get(path: string, handler: RouteHandler): void {
    this.router.get(path, handler);
  }

  public post(path: string, handler: RouteHandler): void {
    this.router.post(path, handler);
  }

  public put(path: string, handler: RouteHandler): void {
    this.router.put(path, handler);
  }

  public delete(path: string, handler: RouteHandler): void {
    this.router.delete(path, handler);
  }

  public use(handlerOrPath: string | MiddlewareFunction, handler?: MiddlewareFunction): void {
    if (typeof handlerOrPath === 'function') {
      this.middlewareChain.use(handlerOrPath);
    } else if (handler) {
      // TODO: implementare middleware con path specifico
      this.middlewareChain.use(handler);
    }
  }

  public useError(handler: ErrorMiddlewareFunction): void {
    this.middlewareChain.useError(handler);
  }

  public listen(port: number, callback?: () => void): void {
    this.server.listen(port, () => {
      console.log(`🚀 Pico server is running on http://localhost:${port}`);
      callback?.();
    });
  }
}