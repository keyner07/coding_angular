import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IContact } from './contact.type';

const INITIAL_CONTACTS: IContact[] = [
  {
    id: 1,
    firstName: 'Kirill',
    lastName: 'Kirillov',
    email: 'kirill@hotmail.com',
    phones: [
      {
        phoneNumber: '+380505555555'
      },
      {
        phoneNumber: '+380505555555'
      }
    ]
  },
  {
    id: 2,
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'ivan.ivanov@hotmail.com',
    phones: [
      {
        phoneNumber: '+380505555555'
      }
    ]
  }
]

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    private contacts$: BehaviorSubject<IContact[]> = new BehaviorSubject(INITIAL_CONTACTS);
    private contact$: Subject<IContact> = new Subject();
    constructor() {
      const contacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts') as string) : this.contacts$.value;
      this.contacts$.next(contacts);
    }

    getContacts(): Observable<IContact[]> {
      return this.contacts$.asObservable();
    }

    addContact(contact: IContact): void {
      const contacts = this.contacts$.value
      contacts.push(contact);
      this.contacts$.next(contacts);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    updateContact(contact: IContact): void {
      const contacts = this.contacts$.value.map(item => item.id === contact.id ? contact : item);
      this.contacts$.next(contacts);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    deleteContact(id: number): void {
      const contacts = this.contacts$.value.filter(item => item.id !== id)
      this.contacts$.next(contacts);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    getNextId(): number {
      return this.contacts$.value.length + 1;
    }

    getContact(): Observable<IContact> {
      return this.contact$.asObservable();
    }

    setContact(contact: IContact): void {
      this.contact$.next(contact);
    }

    clearContact(): void {
      this.contact$.next({} as IContact);
    }
}
