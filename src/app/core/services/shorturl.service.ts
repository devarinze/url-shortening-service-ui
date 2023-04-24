import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageSearch} from "../data/paging";
import {ShortURL} from "../data/shorturl";

@Injectable({
  providedIn: 'root'
})
export class ShortURLService {
  private path = `${environment.baseUrl}/api/v1/short-url`;

  constructor(private http: HttpClient) {
  }

  public create(shortURL: ShortURL): Observable<any> {
    return this.http.post<any>(`${this.path}/create`, shortURL);
  }

  public getAllShortURLS(body: PageSearch<ShortURL>): Observable<any> {
    return this.http.post<any>(`${this.path}/all`, body);
  }

  public getRedirectLink(urlKey: string): Observable<any> {
    return this.http.get<any>(`${this.path}/redirect-link?urlKey=${encodeURIComponent(urlKey)}`);
  }
}
