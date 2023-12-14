import { Injectable } from '@angular/core';
import { GenericDataService } from '../data/generic-data.service';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../data/contact.model';
import { EnvironmentConfig } from '../../environment.config';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends GenericDataService<Contact> {

  constructor(private http: HttpClient) {
    super(http, `${EnvironmentConfig.dev.apiUrl}/contact`, Contact);
  }
}
