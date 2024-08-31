import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuraUser } from './models/aura-user.model';

@Component({
    templateUrl: './users.component.html',
    providers: [MessageService]
})
export class UserComponent implements OnInit {

 
    users: AuraUser[] = [];
    displayDialog: boolean = false;
    selectedUser: AuraUser = { username: '', email: '', password: '', roles: [] };
    isEditing: boolean = false; 

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}
  
    ngOnInit(): void {
      this.loadUsers();
    }
  
    loadUsers(): void {
      this.users = [
        { username: 'john_doe', email: 'john@example.com', password: 'password123', roles: ['orders'] },
        { username: 'jane_smith', email: 'jane@example.com', password: 'securepass', roles: ['products', 'users'] },
        { username: 'alice_jones', email: 'alice@example.com', password: 'mysecretpass', roles: ['orders', 'products'] }
      ];
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
        this.users = this.users.map(u => u.email === user.email ? user : u);
      } else {
        this.users.push(user);
      }
      this.displayDialog = false; 
    }
  
    handleCancel(): void {
      this.displayDialog = false; 
    }
  
    deleteUser(user: AuraUser): void {
      // Replace this with actual delete logic (e.g., HTTP request to delete user)
      console.log('Deleting user:', user);
      this.users = this.users.filter(u => u.email !== user.email); // Remove the user from the list
    }

    openConfirmDialog(event: Event,user:AuraUser) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Do you want to delete this user?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass:"p-button-danger p-button-text",
          rejectButtonStyleClass:"p-button-text p-button-text",
          acceptIcon:"none",
          rejectIcon:"none",

          accept: () => {
              this.deleteUser(user);
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          }
      });
  }
  }
  
