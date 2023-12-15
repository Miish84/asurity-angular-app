import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class FormComponent {
  @Input() contact!: Contact;
  @Input() contactService!: ContactService;
  @Output() submitEvent = new EventEmitter<Contact[]>;
  contactForm: FormGroup;
  contactFormObject: any

  constructor(private fb: FormBuilder) {
    this.contactFormObject = {
      uuid: [this.contact.uuid || ''],
      firstName: [this.contact.firstName || '', Validators.required],
      lastName: [this.contact.lastName || '', Validators.required],
      email: [this.contact.email || '', [Validators.required, Validators.email]],
      street: [this.contact.street || ''],
      city: [this.contact.city || ''],
      state: [this.contact.state || ''],
      zip: [this.contact.zip || '']
    }

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
        // Form is invalid, handle validation errors
      }
    } else {
      this.submitEvent.error("Please review the form and correct any mistakes");
    }
  }

  private submitEventAction(res: ApiResponse<Contact[]>) {
    if (res.code == 200)
      this.submitEvent.emit(res.payload as Contact[])
    else {
      this.submitEvent.error(null);
    }
  }
}
