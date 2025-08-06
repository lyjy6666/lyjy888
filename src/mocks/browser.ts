import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 配置Service Worker
export const worker = setupWorker(...handlers);