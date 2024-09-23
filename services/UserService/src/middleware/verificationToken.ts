import crypto from 'crypto';
import { pool } from "../database/postgres";





//generate a verification token for user registration
const generateVerificationToken = ()=>{
    return crypto.randomBytes(20).toString('hex');
}


//generate token and guardarlo en la base de datos (postgresql)
export const saveVerificationToken = async (userId: string):Promise<string>=>{
    const token = generateVerificationToken();


    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); 

    await pool.query(
        "INSERT INTO verification_tokens (user_id, token, expiration) VALUES ($1, $2, $3)",
        [userId, token, expiration]
    );

    return token;
}