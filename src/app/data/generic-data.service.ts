import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from './apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericDataService<T> {

  constructor(
    private httpClient: HttpClient,
    protected apiUrl: string,
    private tConstructor: { new(model: Partial<T>): T }
  ) { } //second param removed: , ...args: unknown[]

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

  public getByUuid(uuid: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.apiUrl}/${uuid}`)
      .pipe(
        map((result: any) => new this.tConstructor(result.payload as Partial<T>))
      );
  }
}
