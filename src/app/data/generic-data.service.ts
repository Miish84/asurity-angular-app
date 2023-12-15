import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from './apiResponse.model';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericDataService<T> {

  constructor(
    private httpClient: HttpClient,
    protected apiUrl: string,
    private tConstructor: { new(model: Partial<T>): T }
  ) { }

  public get(): Observable<ApiResponse<T[]>> {
    return this.httpClient
      .get<T[]>(`${this.apiUrl}`)
      .pipe(
        map((result: any) => {
          let response = result as ApiResponse<T[]>;
          response.payload = result.payload?.map((i: Partial<T>) => new this.tConstructor(i))
          return response;
        })
      );
  }

  public create(contact: Contact): Observable<ApiResponse<T[]>> {
    return this.httpClient
      .post(`${this.apiUrl}`, contact)
      .pipe(
        map((result: any) => {
          let response = result as ApiResponse<T[]>;
          return response;
        })
      );
  }

  public update(contact: Contact): Observable<ApiResponse<T[]>> {
    return this.httpClient
      .put(`${this.apiUrl}/${contact.uuid}`, contact)
      .pipe(
        map((result: any) => {
          let response = result as ApiResponse<T[]>;
          return response;
        })
      );
  }

  public delete(uuid: string): Observable<ApiResponse<T>> {
    debugger;
    return this.httpClient
      .delete(`${this.apiUrl}/${uuid}`)
      .pipe(
        map((result: any) => {
          let response = result as ApiResponse<T>;
          return response;
        })
      );
  }
}
