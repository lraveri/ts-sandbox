import { describe, it, expect } from 'vitest';
import { sum } from '@/index';

describe('sum', () => {
    it('adds two numbers', () => {
        expect(sum(2, 3)).toBe(5);
    });

    it('works with negative numbers', () => {
        expect(sum(-1, -2)).toBe(-3);
    });
});
