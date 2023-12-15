import { Component, OnInit, inject, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  selectedContact: Contact | null = null;
  result?: any;
  showErrorFlag = false
  protected modalService = inject(NgbModal);
  @ViewChild('content') modal!: TemplateRef<any>;

  constructor(protected contactService: ContactService, private cdRef: ChangeDetectorRef) {
    this.showErrorFlag = false;
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
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

  handleSubmitResult(response: ApiResponse<Contact[]>) {
    this.result = response;
    this.modalService.dismissAll();
    if (response.code !== 200 || !response.payload) {
      this.showError();
    } else {
      this.contacts = response.payload;
    }

  }

  handleRowClick(contact: Contact) {
    this.selectedContact = contact;
    this.open(this.modal);
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  open(content: TemplateRef<any>, reset = false) {
    if (reset)
      this.selectedContact = null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
  }

  close() {
    this.showErrorFlag = false;
    this.selectedContact = {} as Contact;
  }

  private showError() {
    this.result.customMessage ||= "Error occurred";
    this.showErrorFlag = true;
  }
}
