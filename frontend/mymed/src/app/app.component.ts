import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalstateService } from './globalStateService';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid pt-4">
      <nav
        class="navbar navbar-expand-lg  sticky-top"
        style="background-color:  #e6f9ff"
        *ngIf="globalState.token"
      >
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li class="nav-item">
                <a class="nav-link" [routerLink]="['/']"> Home </a>
              </li>
              <li>
                <a
                  class="nav-link"
                  [routerLink]="['/', 'medications']"
                  *ngIf="role === 'patient'"
                >
                  Medications </a
                ><a
                  class="nav-link"
                  [routerLink]="['/', 'patients']"
                  *ngIf="role === 'admin'"
                >
                  Patients
                </a>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-link" (click)="logout()">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav
        class="navbar navbar-expand-lg"
        style="background-color:  #e6f9ff"
        *ngIf="!globalState.token"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/', 'login']"> login </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/', 'signup']"> signup </a>
          </li>
        </ul>
      </nav>

      <router-outlet> </router-outlet>

      <div style="padding: 80px 40px 92px 40px"></div>

      <footer
        class="page-footer font-small blue fixed-bottom"
        style=" background-color:
      #d5def2"
      >
        <div class="footer-copyright text-center py-3">© 2022 Copyright:</div>
      </footer>
    </div>
  `,
  styles: [
    `
      a {
        margin-right: 30px;
      }
     
    `,
  ],
})
export class AppComponent {
  title = 'mymed';
  globalState!: { token: any; data: any };
  role: string = '';

  constructor(private router: Router, private stateSer: GlobalstateService) {
    this.stateSer.gloabalState.subscribe((state) => {
      this.globalState = state;
    });
    this.stateSer.gloabalState.subscribe((state) => {
      this.role = state.data?.role;
    });
  }
  logout() {
    this.stateSer.gloabalState.next({ token: null, data: null });
    this.router.navigate(['']);
  }
}
