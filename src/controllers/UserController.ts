import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService;
    constructor() { this.userService = new UserService() }
    
}