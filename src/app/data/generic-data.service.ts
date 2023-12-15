import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ApiResponse } from './apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericDataService<T extends { uuid: string }> {

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

  public create(item: T): Observable<ApiResponse<T[]>> {
    return this.httpClient
      .post(`${this.apiUrl}`, item)
      .pipe(
        map((result: any) => {
          let response = result as ApiResponse<T[]>;
          return response;
        })
      );
  }

  public update(item: T): Observable<ApiResponse<T[]>> {
    return this.httpClient
      .put(`${this.apiUrl}/${item.uuid}`, item)
      .pipe(
        map((result: any) => {
          let response = result as ApiResponse<T[]>;
          return response;
        })
      );
  }

  public delete(uuid: string): Observable<ApiResponse<T>> {
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
