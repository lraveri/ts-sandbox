import { IncomingMessage, ServerResponse } from 'http';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

// Estendiamo gli oggetti request e response con proprietà custom
export interface PicoRequest extends IncomingMessage {
  params: Record<string, string>;
  query: Record<string, string>;
  body: any;
}

export interface PicoResponse extends ServerResponse {
  json: (data: any) => void;
  send: (data: string) => void;
}

// La funzione next() permette di passare al prossimo middleware
export type NextFunction = (error?: any) => void;

// Definizione della funzione middleware
export type MiddlewareFunction = (
  req: PicoRequest,
  res: PicoResponse,
  next: NextFunction
) => void | Promise<void>;

// Handler per gli errori nel middleware
export type ErrorMiddlewareFunction = (
  err: any,
  req: PicoRequest,
  res: PicoResponse,
  next: NextFunction
) => void | Promise<void>;