import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuraUser } from '../../models/aura-user.model';
import { SelectItem } from 'src/app/aura-ecommerce/components/shared/models/p-multi-dropdown/select-item-multidropdown.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  
  roles: SelectItem[] = [
    { name: 'Orders', code: 'orders' },
    { name: 'Products', code: 'products' },
    { name: 'Users', code: 'users' }
  ];
  selectedRoles: SelectItem[] =[];

  submitted: boolean = false;


  @Input() display: boolean = false;
  @Output() onSave = new EventEmitter<AuraUser>();
  @Output() onCancel = new EventEmitter<void>();
  
  private _user: AuraUser = { username: '', email: '', password: '', roles: [] };
  @Input()
  get user(): AuraUser {
    return this._user;
  }
  set user(value: AuraUser) {
    this._user = value;
    this.onUserChange(); 
  }

  private onUserChange(): void {
    this.selectedRoles =this.roles.filter(role => this._user.roles.includes(role.code));  
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
    this.user.roles = this.selectedRoles.map(role => role.code);
    return this.user.username.trim() !== '' && this.user.email.trim() !== '' && this.user.password.trim() !== '';
  }
}
