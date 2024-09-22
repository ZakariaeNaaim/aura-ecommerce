import { User } from 'src/app/aura-ecommerce/auth/models/user.model';
import { OrderEtatEnum } from '../enum/order-etat.enum';

export interface Order {
    id: number;
    reference: string;
    totalCommand: number;
    etat: OrderEtatEnum;
    orderDate: Date;
    user: User;
}