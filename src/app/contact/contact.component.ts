import { Component, OnInit } from '@angular/core';
import { ListComponent } from './list/list.component';
import { ContactService } from './contact.service';
import { Contact } from '../data/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactService.get()
      .subscribe(contacts => {
        this.contacts = contacts;
      })
  }
}
