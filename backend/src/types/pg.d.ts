import { Pool } from 'pg';

declare module 'pg' {
  interface Pool {
    query(text: string, values?: any[]): Promise<any>;
    fn: {
      now(): string;
    };
  }
}
