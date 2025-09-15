import { RegisterDTO } from '../dtos/auth.dto';

export interface IUserRepository {
    create(payload: RegisterDTO & { password: string }): Promise<any>;
    findByEmail(email: string): Promise<any | null>;
    findById(id: number): Promise<any | null>;
}