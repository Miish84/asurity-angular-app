import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Contact } from '../../data/contact.model';
import { ContactService } from '../contact.service';
import { ApiResponse } from '../../data/apiResponse.model';
import { Observable, of } from 'rxjs'
import { LookupsService } from '../../shared/lookups.service';
import { ContactFrequency } from '../../data/contact-frequency.model';
import { State } from '../../data/state.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges {
  @Input() contact: Contact | null = null;
  @Input() contactService!: ContactService;
  @Output() submitEvent = new EventEmitter<ApiResponse<Contact[]>>;
  contactForm: FormGroup;
  contactFormObject: any
  states!: State[];
  contactFrequencies!: ContactFrequency[];

  constructor(private fb: FormBuilder, protected lookupService: LookupsService) {
    this.contactFormObject = this.setFormObject(this.contact);
    this.contactForm = this.fb.group(this.contactFormObject);
    lookupService.getStates().subscribe(res => this.states = res.payload);
    lookupService.getContactFrequencies().subscribe(res => this.contactFrequencies = res.payload);
  }

  setFormObject(contact: Contact | null): any {
    return {
      uuid: [contact?.uuid || ''],
      firstName: [contact?.firstName || '', [Validators.required, Validators.maxLength(20)]],
      lastName: [contact?.lastName || '', [Validators.required, Validators.maxLength(20)]],
      email: [contact?.email || '', [Validators.required, Validators.email]],
      street: [contact?.street || '', Validators.maxLength(100)],
      city: [contact?.city || '', Validators.maxLength(50)],
      state: contact?.state || '',
      zip: [contact?.zip || null],
      frequency: contact?.frequency || null,
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

  stateValidatorAsync(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const state: string = control.value;

    if (state.length != 2 && state.length != 0) {
      // Emit an object with a validation error.
      return of({ 'notState': true });
    }
    // Emit null, to indicate no error occurred.
    return of(null);
  }

  private submitEventAction(res: ApiResponse<Contact[]>) {
    this.submitEvent.emit(res);
  }
}

