import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ShortURLService} from "../../core/services/shorturl.service";
import {ShortURL} from "../../core/data/shorturl";
import {environment} from "../../../environments/environment";
import { Clipboard } from '@angular/cdk/clipboard';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Subject} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shortURL: ShortURL = new ShortURL();
  shortURLForm: FormGroup;
  busy = false;
  canCreate = true;
  eventsSubject: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private shortURLService: ShortURLService,
    private clipboard: Clipboard,
    private notificationService: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.shortURLForm = this.fb.group({
      redirectLink: [this.shortURL.redirectLink, [Validators.required]],
      expiryDate: [this.shortURL.expiryDate ? new Date(this.shortURL.expiryDate) : null, [Validators.required]],
      urlKey: [this.shortURL.urlKey],
      generatedLink: [`${environment.urlPrefix}/${this.shortURL.urlKey}`],
    });
  }

  create() {
    this.busy = true;
    this.shortURLService.create(this.shortURLForm.value).pipe(untilDestroyed(this)).subscribe(res => {
        this.notificationService.success('Success', 'URL generated successfully');
        this.busy = false;
        this.canCreate = false;
        this.shortURL = res.payload;
        this.initForm();
        this.emitEventToChild();
    }, error => this.busy = false);
  }

  generateAnother() {
    this.canCreate = true;
    this.shortURL = new ShortURL();
    this.initForm();
  }

  copyGeneratedLink(): void {
    const text: string = this.shortURLForm.value.generatedLink;
    const successful = this.clipboard.copy(text);
    if (successful) {
      this.notificationService.success('Copied!', 'Text copied successfully')
    } else {
      this.notificationService.success('Failed', 'Unable to copy text')
    }
  }

  disablePast = (date: Date): boolean => {
    return date <= new Date();
  }

  emitEventToChild() {
    this.eventsSubject.next();
  }

  ngOnDestroy(): void {
  }
}
