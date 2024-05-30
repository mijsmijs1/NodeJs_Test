import { AppDataSource } from "../data-source";
import { User } from "../models/user_model/User";
import i18n from "../config/i18n";
import { bcryptService } from "../utils/bcrypt";
import { tokenJWT } from "../utils/JWT";

export interface CreateUserInterface {
    userName: string,
    email: string,
    password: string
}
export interface loginDataInterface {
    userName: string,
    password: string
}
export class UserService {
    private userRepository = AppDataSource.getRepository(User)
    async login(loginData: loginDataInterface) {
        try {
            const user = await this.userRepository.findOne({ where: { userName: loginData.userName } })
            if (!user) {
                throw { message: i18n.__('messages.error.authen.accountNotFound') }
            }
            if (!(await bcryptService.verifyPass(user.password, loginData.password))) {
                throw { message: i18n.__('messages.error.authen.incorrectPassword') }
            }
            let token = tokenJWT.createToken({ id: user.id, userName: user.userName, email: user.email, password: user.password })
            return { data: token };
        } catch (err: any) {
            console.log(err)
            if (err.message) {
                return { error: err.message };
            }
            return { error: i18n.__('messages.error.databaseError') };
        }
    }
    async createUser(createData: CreateUserInterface) {
        try {
            const user = new User();
            user.userName = createData.userName;
            user.email = createData.email;
            user.password = await bcryptService.hashPass(createData.password);
            return { data: await this.userRepository.save(user) };
        } catch (err: any) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.log(err)
                const message = err.sqlMessage.includes(createData.userName) ? i18n.__('messages.error.user.userNameExists') : i18n.__('messages.error.user.emailExists');
                return { error: message };
            }
            return { error: i18n.__('messages.error.databaseError') };
        }
    }
    async getUserById(id: number) {
        try {
            const user = await this.userRepository.findOneBy({ id })
            if (!user) {
                throw { message: i18n.__('messages.error.user.notFound') }
            }
            return { data: user };
        } catch (err: any) {
            if (err.message) {
                return { error: err.message };
            }
            return { error: i18n.__('messages.error.databaseError') };
        }
    }
    async update(id: number, updateData: any) {
        try {
            if (Object.keys(updateData).length === 0) {
                throw { message: i18n.__('messages.error.updateDataRequired') };
            }
            const user = await this.userRepository.findOneBy({ id })
            if (!user) {
                throw { message: i18n.__('messages.error.user.notFound') }
            }
            updateData.userName && (user.userName = updateData.userName);
            updateData.email && (user.email = updateData.email);
            updateData.password && (user.password = updateData.password);
            await this.userRepository.save(user)
            return { data: await this.userRepository.findOneBy({ id }) };
        } catch (err: any) {
            if (err.code == 'ER_DUP_ENTRY') {
                const message = err.sqlMessage.includes(updateData.userName) ? i18n.__('messages.error.user.userNameExists') : i18n.__('messages.error.user.emailExists');
                return { error: message };
            }
            if (err.message) {
                return { error: err.message };
            }

            return { error: i18n.__('messages.error.databaseError') };
        }
    }
    async deleteById(id: number) {
        try {
            const user = await this.userRepository.findOneBy({ id })
            if (!user) {
                throw { message: i18n.__('messages.error.user.notFound') }
            }
            await this.userRepository.delete({ id })
            return { data: true };
        } catch (err: any) {
            if (err.message) {
                return { error: err.message };
            }
            return { error: i18n.__('messages.error.databaseError') };
        }
    }
}