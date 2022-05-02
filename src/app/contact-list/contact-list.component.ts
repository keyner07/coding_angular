import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { IContact } from '../services/contact.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.sass']
})
export class ContactListComponent implements OnInit {
  contacts: Observable<IContact[]>;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  onDelete(id: number): void {
    this.contactService.deleteContact(id);
    this.getContacts();
  }

  onEdit(contact: IContact): void {
    this.contactService.setContact(contact);
  }

}
