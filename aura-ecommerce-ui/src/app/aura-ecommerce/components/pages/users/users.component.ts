import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuraUser } from './models/aura-user.model';
import { UserManagementService } from './services/user-management.service';

@Component({
  templateUrl: './users.component.html',
  providers: [MessageService]
})
export class UserComponent implements OnInit {


  users: AuraUser[] = [];
  displayDialog: boolean = false;
  selectedUser: AuraUser = { username: '', email: '', password: '', roles: [] };
  isEditing: boolean = false;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  formatRoles(roles: { id: number; name: string }[]): string {
    return roles?.map(role => role.name).join(', ');
  }

  loadUsers(): void {
    this.userManagementService.getAllUsers().subscribe(
      {
        next:(res)=>{
          this.users =res;
        },
        error :()=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'error while getting Users' });
        }
      }
    )
  }

  showDialog(user?: AuraUser): void {
    if (user) {
      this.selectedUser = { ...user };
      this.isEditing = true;
    } else {
      this.selectedUser = { username: '', email: '', password: '', roles: [] };
      this.isEditing = false;
    }
    this.displayDialog = true;
  }

  handleSave(user: AuraUser): void {
    if (this.isEditing) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
    this.displayDialog = false;
  }

  handleCancel(): void {
    this.displayDialog = false;
  }

  deleteUser(user: AuraUser): void {
    this.userManagementService.deleteUser(user.id).subscribe({
      next:(res)=>{
        if(res){
          this.users = this.users.filter(u => u.id !== user.id);
          this.messageService.add({ severity: 'success ', summary: 'Confirmed', detail: 'user deleted' });
        }
      },
      error:()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "can't delete user" });
      }
    })
    
  }

  openConfirmDialog(event: Event, user: AuraUser) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteUser(user);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  private updateUser(user:AuraUser){
    this.userManagementService.updateUser(user).subscribe({
      next:(res)=>{
        if(res){
          this.users = this.users.map(u => u.id === user.id ? user : u);
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'user updated' });
        }
      },
      error:()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "can't update user" });
      }
    });
  }

  private createUser(user:AuraUser){
    this.userManagementService.createUser(user).subscribe({
      next:(res)=>{
        if(res){
          this.users.push(user);
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'user created' });
        }
      },
      error:()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "can't create user" });
      }
    });
  }

}