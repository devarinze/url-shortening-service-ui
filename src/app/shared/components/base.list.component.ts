import {Component} from '@angular/core';

@Component({
  template: '',
})
export class BaseListComponent {
  total: number;
  size: number;

  constructor() {
  }

  trackByFn(index, d) {
    return d.id;
  }

  pagedResponse(res: any) {
    this.total = res[`totalElements`];
    this.size = res[`size`];
    if (res[`content`] instanceof Array) {
      return res[`content`];
    } else return res;
  }
}
