import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../../shared/utils/message';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  get(path: any, headers?: any): Observable<Message> {
    return this.httpClient.get<Message>(`${environment.endpoints.host}${path}`, { headers: headers ? headers : this.headers });
  }

  post(path, body, headers?): Observable<Message> {
    return this.httpClient.post<Message>(`${environment.endpoints.host}${path}`, JSON.stringify(body), { headers: headers ? headers : this.headers });
  }

  postQueryString(path, headers?) : Observable<Message> {
    return this.httpClient.post<Message>(`${environment.endpoints.host}${path}`, null, { headers: headers ? headers : this.headers });
  }

  upload(path: any, formData: any): Observable<Message> {
    return this.httpClient.post<Message>(`${environment.endpoints.host}${path}`, formData);
  }

  search(path: any, filtro: string, pagina: number, quantidade: number, headers?: any): Observable<Message> {
    return this.httpClient.get<Message>(`${environment.endpoints.host}${path}?filtro=${filtro}&quantidade=${quantidade}&pagina=${pagina}`,
      { headers: headers ? headers : this.headers });
  }

  obterQuantidadeItensRetornadosPesquisaPorFiltro(path: any, filtro: string) {
    return this.httpClient.get<Message>(`${environment.endpoints.host}${path}?filtro=${filtro}`);
  }

  removerPorId(path: any, headers?: any) {
    return this.httpClient.delete(`${environment.endpoints.host}${path}`, { headers: headers ? headers : this.headers });
  }
}
