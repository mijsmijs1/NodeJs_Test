import i18n from "../config/i18n";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";
export class UserController {
    private userService: UserService;
    constructor() { this.userService = new UserService() }
    public createUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { userName, email, password } = req.body;
            const { data, error } = await this.userService.createUser({ userName, email, password });
            if (error) {
                return res.status(400).json({ message: error });
            }
            return res.status(201).json({ message: i18n.__('messages.success.user.created'), data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('messages.error.internalError') })
        }

    };
    public getUserById = async (req: Request, res: Response): Promise<any> => {
        try {
            const userId = Number(req.params.id)
            const { data, error } = await this.userService.getUserById(userId);
            if (error) {
                if (error.includes('not found')) {
                    return res.status(404).json({ message: error });
                }
                return res.status(400).json({ message: error });
            }
            return res.status(201).json({ message: i18n.__('messages.success.user.found'), data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('messages.error.internalError') })
        }

    };
    public update = async (req: Request, res: Response): Promise<any> => {
        try {
            const userId = Number(req.params.id)
            const updateData = req.body
            const { data, error } = await this.userService.update(userId, updateData);
            if (error) {
                if (error.includes('not found')) {
                    return res.status(404).json({ message: error });
                }
                return res.status(400).json({ message: error });
            }
            return res.status(201).json({ message: i18n.__('messages.success.user.updated'), data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('messages.error.internalError') })
        }

    };
}