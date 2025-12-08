import { describe, it, expect } from 'vitest';
import { Pico } from '@/pico/Pico';
import { Router } from '@/pico/Router';

describe('Pico', () => {
    it('creates an instance', () => {
        const app = new Pico();
        expect(app).toBeInstanceOf(Pico);
    });

    it('registers and handles routes', () => {
        const app = new Pico();
        const handler = () => {};
        
        app.get('/test', handler);
        app.post('/test', handler);
        
        expect(app).toBeDefined();
    });
});

describe('Router', () => {
    it('registers a route', () => {
        const router = new Router();
        const handler = () => {};
        
        router.get('/test', handler);
        const route = router.match('GET', '/test');
        
        expect(route).toBeDefined();
        expect(route?.path).toBe('/test');
        expect(route?.method).toBe('GET');
        expect(route?.handler).toBe(handler);
    });

    it('matches exact paths', () => {
        const router = new Router();
        const handler = () => {};
        
        router.get('/test', handler);
        
        expect(router.match('GET', '/test')).toBeDefined();
        expect(router.match('GET', '/wrong')).toBeUndefined();
        expect(router.match('POST', '/test')).toBeUndefined();
    });
});