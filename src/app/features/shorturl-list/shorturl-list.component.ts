import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {BaseListComponent} from "../../shared/components/base.list.component";
import {PageSearch} from "../../core/data/paging";
import {ShortURL} from "../../core/data/shorturl";
import {ShortURLService} from "../../core/services/shorturl.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-shorturl-list',
  templateUrl: './shorturl-list.component.html',
  styleUrls: ['./shorturl-list.component.scss'],
})
export class ShortURLListComponent extends BaseListComponent implements OnInit {
  @Input() events: Observable<void>;
  pageSearch = new PageSearch<ShortURL>();
  busy = false;
  shortURLs: ShortURL[] = [];
  env = environment;

  constructor(private shortURLService: ShortURLService) {
    super();
  }

  ngOnInit(): void {
    this.events.pipe(untilDestroyed(this)).subscribe(() => this.getAllShortURLS());
    this.getAllShortURLS();
  }

  getAllShortURLS() {
    this.busy = true;
    this.pageSearch.data = new ShortURL();
    this.shortURLService.getAllShortURLS(this.pageSearch).pipe(untilDestroyed(this)).subscribe(res => {
      this.shortURLs = this.pagedResponse(res.payload);
      this.busy = false;
    });
  }

  pagination(reset: boolean = false) {
    if (reset) {
      this.pageSearch.page.page = 1;
    }
    this.getAllShortURLS();
  }

  sort($event: { key: string; value: string }) {
    $event.value === 'ascend' ? this.pageSearch.page.order = $event.key : this.pageSearch.page.order = `-${$event.key}`;
    this.getAllShortURLS();
  }
}
