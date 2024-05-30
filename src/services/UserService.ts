import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import i18n from "../config/i18n";

export interface CreateUserInterface {
    userName: string,
    email: string,
    password: string
}

export class UserService {
    private userRepository = AppDataSource.getRepository(User)
    async createUser(createData: CreateUserInterface) {
        try {
            const user = new User();
            user.userName = createData.userName;
            user.email = createData.email;
            user.password = createData.password;
            return { data: await this.userRepository.save(user) };
        } catch (err: any) {
            if (err.code === 'ER_DUP_ENTRY') {
                const message = err.message.includes('userName') ? i18n.__('messages.error.user.userNameExists') : i18n.__('messages.error.user.emailExists');
                return { error: message };
            }
            return { error: i18n.__('messages.error.databaseError') };
        }
    }

}