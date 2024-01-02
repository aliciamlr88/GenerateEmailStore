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

  private getSub: Subscription;
  private createSub: Subscription;
  private saveSub: Subscription;

  private subs: Subscription[];

  constructor(private emailService: EmailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs = [this.getSub, this.createSub, this.saveSub];
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub?.unsubscribe();
    }
  }

  emailForm: FormGroup = new FormGroup({
    salesActual: new FormControl('', []),
    salesLastYear: new FormControl('', []),
    wtd: new FormControl('', []),
    plan: new FormControl('', []),
    uptActual: new FormControl('', []),
    uptLastYear: new FormControl('', []),
    adsActual: new FormControl('', []),
    adsLastYear: new FormControl('', []),
    returnAmt: new FormControl('', []),
    mobileActual: new FormControl('', []),
    mobileGoal: new FormControl('', []),
    mobileLastDay: new FormControl('', []),
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
    observation: new FormControl('', []),
  });

  onSubmit() {
    this.isValidFormSubmitted = false;

    this.submitted = true;

    if (this.emailForm.invalid){
      return;
    }
     
    this.email = this.emailForm.value;

    if (this.emailId === undefined) {
      console.log(this.email);
      
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
}
