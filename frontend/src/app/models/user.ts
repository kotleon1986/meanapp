import { Role } from './role';

export class User {
    id: number | string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    avatar: string;
    roleId?: number;
    role: Role;
}
