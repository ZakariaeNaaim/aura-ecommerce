import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuraUser } from '../../models/aura-user.model';
import { SelectItem } from 'src/app/shared/models/p-multi-dropdown/select-item-multidropdown.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'] // Corrected from styleUrl to styleUrls
})
export class UserDialogComponent {
  roles: SelectItem[] = [
    { name: 'ROLE_ORDERS', code: 1 },
    { name: 'ROLE_PRODUCTS', code: 2 },
    { name: 'ROLE_PRODUCTS_ADMIN', code: 3 },
    { name: 'ROLE_USERS', code: 4 },
    { name: 'ROLE_DASHBOARD', code: 5 }
  ];
  selectedRoles: SelectItem[] = [{ name: 'ROLE_DASHBOARD', code: 5 }];
  submitted: boolean = false;

  @Input() display: boolean = false;
  @Output() onSave = new EventEmitter<AuraUser>();
  @Output() onCancel = new EventEmitter<void>();

  private _user: AuraUser = { username: '', email: '', password: '', role: [] };
  
  @Input()
  get user(): AuraUser {
    return this._user;
  }
  
  set user(value: AuraUser) {
    this._user = value;
    this.updateSelectedRoles();
  }

  hideDialog(): void {
    this.display = false;
    this.onCancel.emit();
  }

  saveUser(): void {
    this.submitted = true;

    if (this.isValid()) {
      this.onSave.emit(this.user);
      this.hideDialog();
    }
  }

  isValid(): boolean {
    this.ensureDashboardRole();

    this.user.role = this.selectedRoles.map(role => ({
      id: role.code,
      name: role.name
    }));

    return this.isUserDetailsValid();
  }

  private ensureDashboardRole(): void {
    if (!this.selectedRoles.some(role => role.code === 5)) {
      const dashboardRole = this.roles.find(role => role.code === 5);
      if (dashboardRole) {
        this.selectedRoles.push(dashboardRole);
      }
    }
  }

  private isUserDetailsValid(): boolean {
    const { username, email, password } = this.user;
    return username.trim() !== '' && email.trim() !== '' && password.trim() !== '';
  }

  private updateSelectedRoles(): void {
    this.selectedRoles = this.roles.filter(role =>
      this._user?.role?.some(userRole => userRole.id === role.code)
    );
  }
}
