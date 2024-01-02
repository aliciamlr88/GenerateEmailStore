import { Injectable } from '@angular/core';
import { Email } from '../models/email';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  /**
* Our in memory ide datasource
*/
  private emails: Email[] = [];

  constructor() { }


  /**
* Create a email. Returns the primary key.
* @param ide the ide to create
* @return observable of the primary key
*/
  public createEmail(email: Email): Observable<number> {
    try {

      if (this.emails.length === 0) {
        email.emailId = 1;
      } else {
        email.emailId = Math.max(...this.emails.map(x => x.emailId)) + 1;
      }

      this.emails.push(email);

      return of(email.emailId);

    } catch (error) {
      return of(0);
    }
  }


  /**
* Save an email
* @param ide the email to save
* @return observable of the boolean
*/
  public saveEmail(email: Email): Observable<boolean> {
    try {
      const index = this.emails.findIndex(i => i.date == email.date);

      if (index !== -1) {
        this.emails[index] = email;
      }
      return of(true);

    } catch (error) {
      return of(false);
    }
  }



  /**
   * Get One email
   * @param date the date of the email
   * @returns the email
   */
  getEmail(date: string): Observable<Email | undefined> {
    try {
      const email = this.emails.find(c => c.date == date);
      return of(email);

    } catch (error) {
      return of(undefined);
    }
  }




}
