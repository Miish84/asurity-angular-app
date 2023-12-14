import { Component, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { Contact } from '../../data/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ListItemComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() contacts: Contact[] = [];
}
