
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) { }
  serverip = 'http://localhost:3030/api'
  serverIp = 'http://localhost:3030/api/'
  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get(link: string) {
    return this.http.get(this.serverip + link, { headers: this.getHeaders() }).toPromise();
  }

  post(link: string, body: any) {
    return this.http.post(this.serverip +link, body, { headers: this.getHeaders() }).toPromise();
  }

  getS(link: string) {
    return this.http.get(this.serverIp+link,{ headers: this.getHeaders() });
  }

  postS(link: string, body: any) {
    return this.http.post(this.serverIp+link, body, { headers: this.getHeaders() });
  }
  patchS(link: string,body: any) {
    return this.http.patch(this.serverIp+link,body, { headers: this.getHeaders() });
  }
  deleteS(link: string) {
    return this.http.delete(this.serverIp+link, { headers: this.getHeaders() }, );
  }
}