import {Injectable} from '@angular/core';
import {isEmpty, isNullOrUndefined} from './util';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  save(key: string, data: any) {
    if (!isNullOrUndefined(this.get(key))) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      this.remove(key);
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  get(key: string) {
    if (!isNullOrUndefined(key)) {
      if (!isEmpty(localStorage.getItem(key))) {
        return JSON.parse(localStorage.getItem(key));
      }
    }
    return null;
  }

  exists(key: string) {
    return !!this.get(key);
  }

  remove(key: string) {
    if (!isNullOrUndefined(key)) {
      localStorage.removeItem(key);
    }
  }
}
