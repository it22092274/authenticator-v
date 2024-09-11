import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
    } catch (error) {
        throw new Error('Error hashing password')
    }
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        // Compare the password with the hashed password
        const match = await bcrypt.compare(password, hashedPassword);

        return match;
    } catch (error) {
        throw new Error('Error verifying password');
    }
};