import { Component, OnDestroy, OnInit } from '@angular/core';
import { Email } from '../models/email';
import { Subscription } from 'rxjs';
import { EmailService } from '../services/email.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.css']
})
export class CreateEmailComponent implements OnInit, OnDestroy {
  public email: Email = new Email();
  private emailId: string;
  public isValidFormSubmitted: boolean = false;
  public submitted: boolean = false;
  public message: string;
  public textToSend: string = "";
  public subject: string = "";

  private getSub: Subscription;
  private createSub: Subscription;
  private saveSub: Subscription;

  private subs: Subscription[];

  constructor(private emailService: EmailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmail();
    this.subs = [this.getSub, this.createSub, this.saveSub];
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub?.unsubscribe();
    }
  }

  emailForm: FormGroup = new FormGroup({
    salesActual: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    salesLastYear: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    wtd: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    plan: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    uptActual: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    uptLastYear: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    adsActual: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    adsLastYear: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    returnAmt: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    mobileActual: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    mobileGoal: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    mobileLastDay: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9.]*$")]),
    cartonsR: new FormControl('', []),
    cartonsU: new FormControl('', []),
    helpDesk: new FormControl('', []),
    sfsProcessed: new FormControl('', []),
    sfsUnits: new FormControl('', []),
    sfsFillRate: new FormControl('', []),
    sfsGoal: new FormControl('', []),
    sfsQS: new FormControl('', []),
    sfsEnded: new FormControl('', []),
    bopisNew: new FormControl('', []),
    bopisPickUp: new FormControl('', []),
    bopisReturn: new FormControl('', []),
    observation: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.isValidFormSubmitted = false;

    this.submitted = true;

    if (this.emailForm.invalid) {
      return;
    }

    this.email = this.emailForm.value;

    this.calculateFields();

    if (this.emailId === undefined) {

      this.createEmail();


    } else {
      //this.saveCategory();
    }
  }

  //#region Reactive form Getters
  get salesActual() {
    return this.emailForm.get('salesActual');
  }

  get salesLastYear() {
    return this.emailForm.get('salesLastYear');
  }

  get wtd() {
    return this.emailForm.get('wtd');
  }

  get plan() {
    return this.emailForm.get('plan');
  }

  get uptActual() {
    return this.emailForm.get('uptActual');
  }

  get uptLastYear() {
    return this.emailForm.get('uptLastYear');
  }

  get adsActual() {
    return this.emailForm.get('adsActual');
  }

  get adsLastYear() {
    return this.emailForm.get('adsLastYear');
  }

  get returnAmt() {
    return this.emailForm.get('returnAmt');
  }

  get mobileActual() {
    return this.emailForm.get('mobileActual');
  }

  get mobileGoal() {
    return this.emailForm.get('mobileGoal');
  }

  get mobileLastDay() {
    return this.emailForm.get('mobileLastDay');
  }

  get cartonsR() {
    return this.emailForm.get('cartonsR');
  }

  get cartonsU() {
    return this.emailForm.get('cartonsU');
  }

  get helpDesk() {
    return this.emailForm.get('helpDesk');
  }

  get sfsProcessed() {
    return this.emailForm.get('sfsProcessed');
  }

  get sfsUnits() {
    return this.emailForm.get('sfsUnits');
  }

  get sfsFillRate() {
    return this.emailForm.get('sfsFillRate');
  }

  get sfsGoal() {
    return this.emailForm.get('sfsGoal');
  }

  get sfsQS() {
    return this.emailForm.get('sfsQS');
  }

  get sfsEnded() {
    return this.emailForm.get('sfsEnded');
  }

  get bopisNew() {
    return this.emailForm.get('bopisNew');
  }

  get bopisPickUp() {
    return this.emailForm.get('bopisPickUp');
  }

  get bopisReturn() {
    return this.emailForm.get('bopisReturn');
  }

  get observation() {
    return this.emailForm.get('observation');
  }
  //#endregion



  private getEmail():void {
      this.getSub = this.emailService.getEmail().subscribe(
        email => {
         if (email == null) {
         
           this.email = new Email();
         } else {
         
          
           this.email = email;
           this.emailForm.patchValue(
            this.email
           );
         }
       },
  
     );
  }
 

  private createEmail(): void {
    this.createSub = this.emailService.createEmail(this.email).subscribe(
      id => {
        if (id != 0) {
          this.message = `Email saved. Id: ${id}`;
          let salesActual = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.salesActual);
          let salesLastYear = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.salesLastYear);
          let percentageSales = Intl.NumberFormat('en-us', { minimumFractionDigits: 0 }).format(this.email.percentageSales);
          let wtd = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(+this.email.wtd + +this.email.salesActual);
          let plan = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.plan);
          let percentagewtdPlan = Intl.NumberFormat('en-us', { minimumFractionDigits: 0 }).format(this.email.percentagewtdPlan);
          let wtdEA = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.wtdEA);
          let percentagewtdEAPlan = Intl.NumberFormat('en-us', { minimumFractionDigits: 0 }).format(this.email.percentagewtdEAPlan);
          let uptActual = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.uptActual);
          let uptLastYear = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.uptLastYear);
          let uptPercentage = Intl.NumberFormat('en-us', { minimumFractionDigits: 0 }).format(this.email.uptPercentage);
          let adsActual = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.adsActual);
          let adsLastYear = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.adsLastYear);
          let adsPercentage = Intl.NumberFormat('en-us', { minimumFractionDigits: 0 }).format(this.email.adsPercentage);
          let returnAmt = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.returnAmt);
          let mobileActual = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(this.email.mobileActual);
          let mobileLastDay = Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format( +this.email.mobileLastDay + +this.email.mobileActual);
          let percentageMobile = Intl.NumberFormat('en-us', { minimumFractionDigits: 0 }).format(this.email.percentageMobile);
          let formattedDate: String = this.formatDate(this.email.dateFormat);  

          this.textToSend = `<b><u>STORE RESULTS</u></b><br>SALES: TY \$${salesActual}` +
            `/ LY \$${salesLastYear} ` +
            `Comp: ${(this.email.percentageSales ?? 0) >= 0 ? ' + ' : ''}${percentageSales} % <br>`+
            `WTD: TY \$${wtd} / Plan \$${plan} `+
            `(${percentagewtdPlan} %) <br>`+
            `WTD + EA: \$${wtdEA} (${percentagewtdEAPlan} %) <br>`+
            `UPTs: TY \$${uptActual} / LY \$${uptLastYear} `+
            `Comp: ${(this.email.uptPercentage ?? 0) >= 0 ? ' + ' : ''} ${uptPercentage} % <br>`+
            `ADS: TY \$${adsActual} / LY \$${adsLastYear}`+
            `Comp: ${(this.email.adsPercentage ?? 0) >= 0 ? ' + ' : '' } ${adsPercentage} % <br><br>`;

          this.textToSend += `<b>Retail returns:</b> ${returnAmt}<br><br>`;
          this.textToSend += '<b>Omni Sales:</b><br>';
          this.textToSend += `Omni Sales: \$${mobileActual}<br>`;
          this.textToSend += `WTD Omni Sales: \$${mobileLastDay}<br>`;
          this.textToSend += `Omni Sales Goal: \$${this.email.mobileGoal} (${percentageMobile}%)<br>`;
          this.textToSend += '<br>';
          this.textToSend += '<b>Stock:</b><br>';
          this.textToSend += `# of Stock Received: ${this.email.cartonsR}<br>`;
          this.textToSend += `# of Unprocessed Boxes: ${this.email.cartonsU}<br>`;
          this.textToSend += '<br>';
          this.textToSend += `Help Desk Tickets: ${this.email.helpDesk}<br>`;
          this.textToSend += '<br>';
          this.textToSend += '<b><u>SFS RESULTS</u></b><br>';
          this.textToSend += `# of orders processed: ${this.email.sfsProcessed}<br>`;
          this.textToSend += `Units: ${this.email.sfsUnits}<br>`;
          this.textToSend += `Fill Rate: Goal: ${this.email.sfsGoal}% Actual: ${this.email.sfsFillRate} % <br>`;
          this.textToSend += `Queue Started at: ${this.email.sfsQS}<br>`;
          this.textToSend += `Ended at: ${this.email.sfsEnded}<br>`;
          this.textToSend += '<br>';
          this.textToSend += '<b><u>BOPIS</u></b><br>';
          this.textToSend += `New: ${this.email.bopisNew}<br>`;
          this.textToSend += `Picked Up: ${this.email.bopisPickUp}<br>`;
          this.textToSend += `Return to Shelf: ${this.email.bopisReturn}<br>`;
          this.textToSend += '<br>';
          this.textToSend += '<u><b>OBSERVATIONS</b> <br></u>';
          this.textToSend += this.convertToList(this.email.observation) ;
          this.subject = `Closing ${formattedDate}`;





        } else {
          this.isValidFormSubmitted = false;
          this.message = `Email not saved`;
        }
      }
    );
  }


  private convertToList(text: string): string {
    let htmlList : string = '';
    const lines = text.split('\n');

    const liElements = lines.map(line => `<li>${line.trim()}</li>`).join('');
    htmlList = `<ul>${liElements}</ul>`;
    return htmlList;
  }


  private formatDate(date: Date): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${month} ${day}, ${year}`;
  }


  private calculateFields(): void {
    if (this.email.salesLastYear > 0) {
      this.email.percentageSales = ((this.email.salesActual - this.email.salesLastYear) * 100 / this.email.salesLastYear);
    } else {
      this.email.percentageSales = this.email.salesActual * 100;
    }

    let wtdSales: number = +this.email.wtd + +this.email.salesActual;
    if (this.email.plan > 0) {
      this.email.percentagewtdPlan = (wtdSales * 100 / this.email.plan);
    } else {
      this.email.percentagewtdPlan = wtdSales * 100;
    }

    if (this.email.uptLastYear > 0) {
      this.email.uptPercentage = ((this.email.uptActual - this.email.uptLastYear) * 100 / this.email.uptLastYear);
    } else {
      this.email.uptPercentage = this.email.uptActual * 100;
    }


    if (this.email.adsLastYear > 0) {
      this.email.adsPercentage = ((this.email.adsActual - this.email.adsLastYear) * 100 / this.email.adsLastYear);
    } else {
      this.email.adsPercentage = this.email.adsActual * 100;
    }
    let mobileLastDaySum: number = +this.email.mobileLastDay + +this.email.mobileActual;
    if (this.email.mobileGoal > 0) {
      this.email.percentageMobile = (mobileLastDaySum * 100 / this.email.mobileGoal);
    } else {
      this.email.percentageMobile = mobileLastDaySum * 100;
    }


    let wtdEA: number = +wtdSales;
    this.email.wtdEA = wtdEA;
    if (this.email.plan > 0) {
      this.email.percentagewtdEAPlan = (wtdEA * 100 / this.email.plan);
    } else {
      this.email.percentagewtdEAPlan = wtdEA * 100;
    }

    this.email.cartonsR = this.email.cartonsR != "" ? this.email.cartonsR : "0";
    this.email.cartonsU = this.email.cartonsU != "" ? this.email.cartonsU : "0";
    this.email.helpDesk = this.email.helpDesk != "" ? this.email.helpDesk : "0";
    this.email.sfsProcessed = this.email.sfsProcessed != "" ? this.email.sfsProcessed : "0";
    this.email.sfsUnits = this.email.sfsUnits != "" ? this.email.sfsUnits : "0";
    this.email.sfsFillRate = this.email.sfsFillRate != "" ? this.email.sfsFillRate : "0";
    this.email.sfsQS = this.email.sfsQS != "" ? this.email.sfsQS : "0";
    this.email.sfsGoal = this.email.sfsGoal != "" ? this.email.sfsGoal : "85";
    this.email.sfsEnded = this.email.sfsEnded != "" ? this.email.sfsEnded : "0";
    this.email.bopisNew = this.email.bopisNew != "" ? this.email.bopisNew : "0";
    this.email.bopisPickUp = this.email.bopisPickUp != "" ? this.email.bopisPickUp : "0";
    this.email.bopisReturn = this.email.bopisReturn != "" ? this.email.bopisReturn : "0";

    this.email.dateFormat = new Date();
    this.email.date = this.formatISODate( this.email.dateFormat);
    
    
  }


  private formatISODate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  generateOutlookMailtoLink(): string {
     const mailtoLink = `mailto:?subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(this.textToSend)}&app=Outlook`;
    return mailtoLink;
  }

}
