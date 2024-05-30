import bcrypt from 'bcrypt';
export const bcryptService = {
    hashPass: async (pass: string) => {
        let password = await bcrypt.hash(pass, 10);
        return password;
    },
    verifyPass: async (hassedPass: string, pass: string) => {
        try {
            let password = await bcrypt.compare(pass, hassedPass)
            return password;
        } catch (err) {
            console.log('err', err);
            return false;
        }
    }
}