import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericDataService<T> {

  constructor(
    private httpClient: HttpClient,
    protected apiUrl: string,
    private tConstructor: { new(model: Partial<T>): T }
  ) { } //second param removed: , ...args: unknown[]

  public get(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.apiUrl}`)
      .pipe(
        map((result) => result.map((i) => new this.tConstructor(i)))
      );
  }

  public getByUuid(uuid: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.apiUrl}/${uuid}`)
      .pipe(
        map((result) => new this.tConstructor(result))
      );
  }
}
