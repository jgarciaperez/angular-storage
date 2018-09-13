import { Injectable } from '@angular/core';

export interface CookieInterface {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookies: CookieInterface = {};

  get(key: string): any {
    if (!this.cookies[key]) {
      const cookie = window.document.cookie
        .split('; ')
        .filter((item: any) => item.split('=')[0] === key)
        .pop();
      if (!cookie) {
        return null;
      }
      this.cookies[key] = this.parse(
        cookie
          .split('=')
          .slice(1)
          .join('=')
      );
    }
    return this.parse(this.cookies[key]);
  }

  set(key: string, value: any, expires?: Date): void {
    this.cookies[key] = value;
    const cookie = `${key}=${value}; path=/${expires ? `; expires=${expires.toUTCString()}` : ''}`;
    window.document.cookie = cookie;
  }

  remove(key: string) {
    document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    delete this.cookies[key];
  }

  private parse(value: any) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
}
