import { Component, OnInit } from '@angular/core';
import { ListComponent } from './list/list.component';
import { ContactService } from './contact.service';
import { Contact } from '../data/contact.model';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap'
import { ApiResponse } from '../data/apiResponse.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ListComponent, NgbAlert, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  result?: any;
  showErrorFlag = false

  constructor(private contactService: ContactService) {
    this.showErrorFlag = false;
  }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactService.get()
      .subscribe(res => {
        this.contacts = res.payload;
        if (res.code == 200)
          console.log(res.customMessage)
        else {
          this.result = res as ApiResponse<Contact[]>;
          this.showError();
        }
      })
  }

  close() {
    this.showErrorFlag = false;
  }

  private showError() {
    this.result.customMessage ||= "Error occurred";
    this.showErrorFlag = true;
  }
}
