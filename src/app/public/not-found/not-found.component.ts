import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="h-screen w-full flex flex-col justify-center items-center pb-10">
      <img src="/assets/images/sad-face-icon.svg" alt="Sad face" class="h-40 w-40 mb-14">
      <b class="text-9xl text-pink-900 mb-4">404</b>
      <span class="text-2xl md:text-4xl text-pink-900">Sorry, we couldn't find this page</span>
    </div>
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
