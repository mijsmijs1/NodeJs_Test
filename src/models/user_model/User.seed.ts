
import { AppDataSource } from '../../data-source';
import { bcryptService } from '../../utils/bcrypt';
import { User } from './User';

export const seed = async () => {
    const userRepository = AppDataSource.getRepository(User)
    try {
        let existedUser = await userRepository.findOneBy({ userName: "admin" })
        if (existedUser) {
            return
        }
        // Tạo bản ghi cho User
        const user = new User();
        user.userName = process.env.ADMIN_NAME || "admin";
        user.password = await bcryptService.hashPass(process.env.ADMIN_PASSWORD || "123456");
        user.email = process.env.ADMIN_EMAIL || "admin@gmail.com";
        await userRepository.save(user)
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

