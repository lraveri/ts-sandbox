import { IncomingMessage, ServerResponse } from 'http';
import { MiddlewareFunction, ErrorMiddlewareFunction, PicoRequest, PicoResponse } from './types';

export class MiddlewareChain {
  private middleware: MiddlewareFunction[] = [];
  private errorHandlers: ErrorMiddlewareFunction[] = [];

  public use(fn: MiddlewareFunction): void {
    this.middleware.push(fn);
  }

  public useError(fn: ErrorMiddlewareFunction): void {
    this.errorHandlers.push(fn);
  }

  private enhanceRequest(req: IncomingMessage): PicoRequest {
    const picoReq = req as PicoRequest;
    picoReq.params = {};
    picoReq.query = {};
    picoReq.body = null;
    return picoReq;
  }

  private enhanceResponse(res: ServerResponse): PicoResponse {
    const picoRes = res as PicoResponse;
    
    // Aggiungiamo metodi helper alla response
    picoRes.json = function(data: any) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    picoRes.send = function(data: string) {
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    };

    return picoRes;
  }

  public async execute(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const picoReq = this.enhanceRequest(req);
    const picoRes = this.enhanceResponse(res);
    
    let currentMiddlewareIndex = 0;

    const next = async (err?: any) => {
      if (err) {
        // Se c'è un errore, passa agli error handlers
        return this.handleError(err, picoReq, picoRes);
      }

      const currentMiddleware = this.middleware[currentMiddlewareIndex];
      currentMiddlewareIndex++;

      if (currentMiddleware) {
        try {
          await currentMiddleware(picoReq, picoRes, next);
        } catch (error) {
          next(error);
        }
      }
    };

    // Avvia la catena dei middleware
    await next();
  }

  private async handleError(err: any, req: PicoRequest, res: PicoResponse): Promise<void> {
    let currentErrorHandlerIndex = 0;

    const next = async (nextErr?: any) => {
      const currentHandler = this.errorHandlers[currentErrorHandlerIndex];
      currentErrorHandlerIndex++;

      if (currentHandler) {
        try {
          await currentHandler(nextErr || err, req, res, next);
        } catch (error) {
          next(error);
        }
      } else {
        // Se non ci sono più error handlers, invia una risposta di errore generica
        res.statusCode = 500;
        res.json({ error: 'Internal Server Error', message: err.message });
      }
    };

    await next();
  }
}