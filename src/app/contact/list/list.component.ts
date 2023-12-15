import { Component, Input } from '@angular/core';
import { Contact } from '../../data/contact.model';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';

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
  @Input() selectContact!: (contact: Contact) => void;

  callDeleteContact(uuid: string): void {
    if (this.deleteContact) {
      this.deleteContact(uuid);
    }
  }
}
