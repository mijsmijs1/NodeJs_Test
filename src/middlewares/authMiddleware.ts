import { NextFunction, Request, Response } from "express";
import { tokenJWT } from "../utils/JWT";
import i18n from "../config/i18n";
import { UserService } from "../services/UserService";

declare global {
    namespace Express {
        interface Request {
            tokenData: any;
        }
    }
}

export class AuthMiddleware {
    private userService: UserService;
    private static instance: AuthMiddleware;

    private constructor() {
        this.userService = new UserService();
    }

    public static getInstance(): AuthMiddleware {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }

    public tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.params.token || String(req.header('Authorization'));
            if (!token) {
                throw { message: i18n.__('messages.error.authen.invalidToken') }
            }

            let tokenData: any = tokenJWT.decodeToken(token);
            if (!tokenData) {
                throw { message: i18n.__('messages.error.authen.invalidToken') }
            }

            let { data } = await this.userService.getUserById(tokenData.id)
            if (!data) {
                throw { message: i18n.__('messages.error.authen.invalidToken') }
            }

            if (data.password != tokenData.password) {
                throw { message: i18n.__('messages.error.authen.invalidToken') }
            }

            req.tokenData = data;
            next();
        } catch (err: any) {
            console.log(err);
            if (err.message) {
                return res.status(401).json({ message: err.message });
            }
            return res.status(500).json({ message: i18n.__('messages.error.internalError') });
        }
    }
}
