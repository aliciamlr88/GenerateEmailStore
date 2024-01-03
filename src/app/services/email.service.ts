import { Injectable } from '@angular/core';
import { Email } from '../models/email';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  /**
* Our in memory email datasource
*/
  private emails: Email[] = [];

  constructor() { }


  /**
* Create a email. Returns the primary key.
* @param email the email to create
* @return observable of the primary key
*/
  public createEmail(email: Email): Observable<number> {
    try {

      if (this.emails.length === 0) {
        email.emailId = 1;
      } else {
        email.emailId = Math.max(...this.emails.map(x => x.emailId)) + 1;
      }

      // Save a single email to localstorage or replaces it if newer
      localStorage.setItem('email', JSON.stringify(email));

      // Save today's date to localstorage
      // localStorage.setItem('date', JSON.stringify(email));

      //this.emails.push(email);

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
   * @returns the email
   */
  getEmail(): Observable<Email | undefined> {
    try {
      // const email = this.emails.find(c => c.date == date);
      const email: Email = JSON.parse(localStorage.getItem('email'));
    
    
      if (!!email && this.formatISODate(email.dateFormat) == this.formatISODate(new Date())) {
       
        return of(email);
      }

      return of(undefined);

    } catch (error) {
      console.log(error);
      return of(undefined);
    }
  }

  private formatISODate(dateEmail: Date): string {

    let date = new Date(dateEmail);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }




}
