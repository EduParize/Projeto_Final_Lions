import bcrypt from 'bcryptjs'
let SALT_ROUNDS = 10;

if(process.env.NODE_ENV === 'test'){
    SALT_ROUNDS = 1
}
export default function hashPassword(password){
    return bcrypt.hashSync(password, SALT_ROUNDS)
}

export function compareHashedPassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}