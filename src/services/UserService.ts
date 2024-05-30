import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export interface createUserInterface {
    userName: string,
    email: string,
    password: string
}

export class UserService {
    private userRepository = AppDataSource.getRepository(User)

}