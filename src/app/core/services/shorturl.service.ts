import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShortURLService {
  private path = `${environment.baseUrl}/api/v1/short-url`;

  constructor(private http: HttpClient) {
  }

  create(redirectLink: string, customURLKey: string): Observable<any> {
    const config = {
      params: {
        redirectLink: redirectLink,
        ...(customURLKey ? {customURLKey} : {}),
      }
    }
    return this.http.get<any>(`${this.path}/create`, config);
  }

  getRedirectLink(urlKey: string): Observable<any> {
    return this.http.get<any>(`${this.path}/redirect-link?urlKey=${encodeURIComponent(urlKey)}`);
  }
}
