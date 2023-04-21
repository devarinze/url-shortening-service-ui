import { Component, OnInit } from '@angular/core';
import {User} from "../core/data/auth.response";
import {AuthService} from "../core/services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.me().pipe(untilDestroyed(this)).subscribe({
      next: (res) => {
        this.user = res.payload;
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}
