import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {of} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {ShortURLService} from "../../core/services/shorturl.service";

@Component({
  selector: 'app-redirect',
  template: ``,
  styles: []
})
@UntilDestroy()
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private shortURLService: ShortURLService) { }

  ngOnInit(): void {
    this.shortURLService.getRedirectLink(this.router.url?.substring(1)).pipe(untilDestroyed(this)).subscribe(res => {
      window.location.href = res.payload;
    }, err => this.router.navigate(["/not-found"]))
  }
}
