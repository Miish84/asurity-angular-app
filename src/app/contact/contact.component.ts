import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ApiResponse } from '../data/apiResponse.model';
import { NgIf } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ContactService } from './contact.service';
import { Contact } from '../data/contact.model';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ListComponent, FormComponent, NgbAlert, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact = null!;
  result?: any;
  showErrorFlag = false
  private modalService = inject(NgbModal);

  constructor(protected contactService: ContactService) {
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

  deleteContact(uuid: string) {
    this.contactService.delete(uuid)
      .subscribe(res => {
        if (res.code == 200)
          this.contacts = this.contacts.filter(c => c.uuid !== uuid);
        else {
          this.result = res as ApiResponse<Contact>;
          this.showError();
        }
      })
  }

  handleSubmitResult(contacts: Contact[]) {
    this.contacts = contacts;
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
  }

  close() {
    this.showErrorFlag = false;
  }

  private showError() {
    this.result.customMessage ||= "Error occurred";
    this.showErrorFlag = true;
  }
}
