declare global {
  namespace Express {
    interface Request {
      org_id?: string;
      user?: any;
      scope?: string;
      session_id?: string;
    }
  }
}
export {};
