import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuraUser } from './models/aura-user.model';
import { UserManagementService } from './services/user-management.service';
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [MessageService]
})
export class UserComponent implements OnInit {


  users: AuraUser[] = [];
  displayDialog: boolean = false;
  selectedUser: AuraUser = { id : 0,username: '', email: '', password: '', role: [] };
  isEditing: boolean = false;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private userManagementService: UserManagementService,private authService:AuthService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  formatRoles(role: { id: number; name: string }[]): string {
    return role?.map(role => {
      const nameWithoutPrefix = role.name?.replace('ROLE_', ''); 
      return nameWithoutPrefix?.charAt(0)?.toUpperCase() + nameWithoutPrefix?.slice(1)?.toLowerCase(); 
    }).join(', ');
  }
  

  loadUsers(): void {
    this.userManagementService.getAllUsers().subscribe(
      {
        next:(res)=>{
          this.users =res;
        },
        error :()=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.translationService.translate('USERS.ERROR_GETTING_USERS') });
        }
      }
    )
  }

  showDialog(user?: AuraUser): void {
    if (user) {
      this.selectedUser = { ...user };
      this.isEditing = true;
    } else {
      this.selectedUser = { username: '', email: '', password: '', role: [] };
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
          this.messageService.add({ severity: 'success ', summary: 'Confirmed', detail: this.translationService.translate('USERS.USER_DELETED') });
        }
      },
      error:()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail:this.translationService.translate('USERS.CANT_DELETE_USER') });
      }
    })
    
  }

  openConfirmDialog(event: Event, user: AuraUser) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:this.translationService.translate('USERS.DO_YOU_WANT_DELETE_USER') ,
      header: this.translationService.translate('USERS.DELETE_CONFIRMATION'),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel : this.translationService.translate('BUTTONS.YES'),
      rejectLabel : this.translationService.translate('BUTTONS.NO'),

      accept: () => {
        this.deleteUser(user);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: this.translationService.translate('USERS.YOU_HAVE_REJECTED') });
      }
    });
  }

  private updateUser(user:AuraUser){
    this.userManagementService.updateUser(user).subscribe({
      next:(res)=>{
        if(res){
          this.users = this.users.map(u => u.id === user.id ? user : u);
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: this.translationService.translate('USERS.USER_UPDATED')});
        }
      },
      error:()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.translationService.translate('USERS.CANT_UPDATE_USER') });
      }
    });
  }

  private createUser(user:AuraUser){
    const clonedUser = structuredClone(user);
    clonedUser.role = clonedUser.role.map(role => role.name);

    this.authService.register(clonedUser).subscribe({
      next:(res)=>{
        if(res){
          this.users.push(user);
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: this.translationService.translate('USERS.USER_CREATED') });
          this.loadUsers();
        }
      },
      error:()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.translationService.translate('USERS.CANT_CREATE_USER') });
      }
    });
  }

}