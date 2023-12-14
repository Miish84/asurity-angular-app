import { Component, Input } from '@angular/core';
import { Contact } from '../../data/contact.model';

@Component({
  selector: 'app-contact-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() contact!: Contact;

  constructor() {
  }
}
