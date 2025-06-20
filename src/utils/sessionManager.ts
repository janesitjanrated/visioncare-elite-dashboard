
// Session Management for temporary data storage
export interface SessionData {
  [key: string]: any;
}

class SessionManager {
  private prefix = 'visioncare_';

  // Get data from session storage
  get<T = any>(key: string): T | null {
    try {
      const data = sessionStorage.getItem(this.prefix + key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting session data:', error);
      return null;
    }
  }

  // Set data to session storage
  set(key: string, data: any): void {
    try {
      sessionStorage.setItem(this.prefix + key, JSON.stringify(data));
    } catch (error) {
      console.error('Error setting session data:', error);
    }
  }

  // Remove data from session storage
  remove(key: string): void {
    try {
      sessionStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Error removing session data:', error);
    }
  }

  // Clear all VisionCare session data
  clear(): void {
    try {
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing session data:', error);
    }
  }

  // Check if data exists
  exists(key: string): boolean {
    return sessionStorage.getItem(this.prefix + key) !== null;
  }

  // Get all keys
  getKeys(): string[] {
    const keys = Object.keys(sessionStorage);
    return keys
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.replace(this.prefix, ''));
  }
}

export const sessionManager = new SessionManager();
