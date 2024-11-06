import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt);
}

export async function comparePassword(plainPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hash);
}
