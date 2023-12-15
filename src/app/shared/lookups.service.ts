import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '../../environment.config';
import { ApiResponse } from '../data/apiResponse.model';
import { Observable, map } from 'rxjs';
import { State } from '../data/state.model';
import { ContactFrequency } from '../data/contact-frequency.model';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  apiUrl: string;
  tConstructor: any;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = EnvironmentConfig.dev.apiUrl;
  }

  public getStates(): Observable<ApiResponse<State[]>> {
    return this.getLookupList<State>("states", State);
  }

  public getContactFrequencies(): Observable<ApiResponse<ContactFrequency[]>> {
    return this.getLookupList<ContactFrequency>("contactfrequencies", ContactFrequency);
  }

  private getLookupList<T>(type: string, constructor: { new(model: T): T }): Observable<ApiResponse<T[]>> {
    return this.httpClient
      .get<T[]>(`${this.apiUrl}/lookup/${type}`)
      .pipe(
        map((result: any) => {
          let response = result as ApiResponse<T[]>;
          response.payload = result.payload?.map((i: T) => new constructor(i))
          return response;
        })
      );
  }
}
