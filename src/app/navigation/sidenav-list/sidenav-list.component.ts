import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css',
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  istAuth = false;
  authSubscribtion: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscribtion = this.authService.authChange.subscribe(
      (authStatus) => {
        this.istAuth = authStatus;
      }
    );
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscribtion.unsubscribe();
  }
}
