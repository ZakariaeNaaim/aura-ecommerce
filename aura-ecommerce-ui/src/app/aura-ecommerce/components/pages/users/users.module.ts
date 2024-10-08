import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './users-routing.module';
import { UserComponent } from './users.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { DataViewModule } from 'primeng/dataview';
import { TranslationModule } from "../../../../shared/services/translation/translate.module";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ConfirmDialogModule,
    MultiSelectModule,
    PasswordModule,
    OrderListModule,
    PickListModule,
    TooltipModule,
    DataViewModule,
    ProgressSpinnerModule,
    TranslationModule
],
    declarations: [UserComponent,UserDialogComponent],
    providers: [ConfirmationService, MessageService]

})
export class UserModule { }
