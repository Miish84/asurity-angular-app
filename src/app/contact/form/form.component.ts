import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../data/contact.model';
import { ContactService } from '../contact.service';
import { ApiResponse } from '../../data/apiResponse.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges {
  @Input() contact!: Contact;
  @Input() contactService!: ContactService;
  @Output() submitEvent = new EventEmitter<ApiResponse<Contact[]>>;
  contactForm: FormGroup;
  contactFormObject: any

  constructor(private fb: FormBuilder) {
    this.contactFormObject = this.setFormObject(this.contact);
    this.contactForm = this.fb.group(this.contactFormObject);
  }

  setFormObject(contact: Contact): any {
    return {
      uuid: [contact?.uuid || ''],
      firstName: [contact?.firstName || '', Validators.required],
      lastName: [contact?.lastName || '', Validators.required],
      email: [contact?.email || '', [Validators.required, Validators.email]],
      street: [contact?.street || ''],
      city: [contact?.city || ''],
      state: [contact?.state || ''],
      zip: [contact?.zip || '']
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const contact = changes['contact']?.currentValue;
    this.contactFormObject = this.setFormObject(contact);
    this.contactForm = this.fb.group(this.contactFormObject);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactForSubmit: Contact = this.contactForm.value;
      if (contactForSubmit.uuid) {
        this.contactService.update(contactForSubmit)
          .subscribe(res => {
            this.submitEventAction(res);
          })
      }
      else {
        this.contactService.create(contactForSubmit)
          .subscribe(res => {
            this.submitEventAction(res);
          })
      }
    } else {
      const response = new ApiResponse<Contact[]>("Form could not validate. Please check values and try again.")
      this.submitEvent.emit(response);
    }
  }

  private submitEventAction(res: ApiResponse<Contact[]>) {
    this.submitEvent.emit(res);
  }
}
