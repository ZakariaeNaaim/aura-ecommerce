import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuraUser } from './models/aura-user.model';

@Component({
    templateUrl: './users.component.html',
    providers: [MessageService]
})
export class UserComponent implements OnInit {

 
    users: AuraUser[] = [];

    constructor() { }
  
    ngOnInit(): void {
      this.loadUsers();
    }
  
    loadUsers(): void {
      // This is where you would typically load users from a service
      // For now, we'll use some mock data
      this.users = [
        { username: 'john_doe', email: 'john@example.com', password: 'password123', roles: ['orders'] },
        { username: 'jane_smith', email: 'jane@example.com', password: 'securepass', roles: ['products', 'users'] },
        { username: 'jane_smith', email: 'jane@example.com', password: 'securepass', roles: ['products', 'users'] },
        { username: 'jane_smith', email: 'jane@example.com', password: 'securepass', roles: ['products', 'users'] },
        { username: 'jane_smith', email: 'jane@example.com', password: 'securepass', roles: ['products', 'users'] },
        { username: 'jane_smith', email: 'jane@example.com', password: 'securepass', roles: ['products', 'users'] },
        { username: 'jane_smith', email: 'jane@example.com', password: 'securepass', roles: ['products', 'users'] },
        { username: 'jane_smith', email: 'jane@example.com', password: 'securepass', roles: ['products', 'users'] },
        { username: 'alice_jones', email: 'alice@example.com', password: 'mysecretpass', roles: ['orders', 'products'] }
      ];
    }
  
    editUser(user: AuraUser): void {
      // Implement the logic to edit the user
      console.log('Editing user:', user);
    }
  
    deleteUser(user: AuraUser): void {
      // Implement the logic to delete the user
      console.log('Deleting user:', user);
    }
  }
  
