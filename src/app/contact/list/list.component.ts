import { Component, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { Contact } from '../../data/contact.model';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() contacts: Contact[] = [];
  @Input() deleteContact!: (uuid: string) => void;
  @Input() contactService!: ContactService;
  @Output() rowClickEvent = new EventEmitter<Contact>;

  callDeleteContact(uuid: string): void {
    if (this.deleteContact) {
      this.deleteContact(uuid);
    }
  }

  callSelectContact(contact: Contact) {
    this.rowClickEvent.emit(contact);
  }
}
