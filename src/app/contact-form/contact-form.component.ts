import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { IPhone } from '../services/contact.type';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.sass']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  update: boolean;
  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeCurrentContact();
  }

  initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      id: [],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phones: this.formBuilder.array([this.createPhone()])
    });
  }

  subscribeCurrentContact(): void {
    this.contactService.getContact().subscribe(contact => {
      if (contact) {
        this.contactForm.patchValue(contact);
        const phoneForm = contact.phones.map(phone => this.createPhone(phone));
        this.contactForm.setControl('phones', this.formBuilder.array(phoneForm));
        this.update = true;
      }
    });
  }

  createPhone(phone?: IPhone): FormGroup {
    const phoneNumber = phone ? phone.phoneNumber : '';
    return this.formBuilder.group({
      phoneNumber: [phoneNumber, Validators.required],
    })
  }

  addPhone(): void {
    this.phones.push(this.createPhone());
  }

  onSubmit(): void {
    if(!this.update) {
      const contact = this.contactForm.value;
      contact.id = this.contactService.getNextId();
      this.contactService.addContact(contact);
    } else {
      this.contactService.updateContact(this.contactForm.value);
    }
    this.contactForm.reset();
    this.update = false;
  }

  get firstName() {
    return this.contactForm.get('firstName');
  }

  get lastName() {
    return this.contactForm.get('lastName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phones() {
    return <FormArray> this.contactForm.get('phones');
  }

}
