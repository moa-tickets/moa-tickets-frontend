/// <reference types="node" />
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';

Object.assign(globalThis, { TextEncoder, TextDecoder });

// IntersectionObserver Mocking
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
Object.defineProperty(globalThis, 'IntersectionObserver', {
  value: mockIntersectionObserver,
  writable: true,
});
