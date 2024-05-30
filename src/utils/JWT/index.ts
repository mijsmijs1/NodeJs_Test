import jwt from 'jsonwebtoken'
export const tokenJWT = {
    createToken: (userData: any) => {
        let token = jwt.sign(userData, String(process.env.JWT_KEY), { expiresIn: '7d' })
        return token
    },
    decodeToken: (token: string) => {
        try {
            return jwt.verify(token, String(process.env.JWT_KEY))
        } catch (err) {
            return false
        }

    }
}