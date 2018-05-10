import crypto from 'crypto';
const key = Buffer.from('5ebe2294ecd0e0f08eab7690d2a6ee695ebe2294ecd0e0f08eab7690d2a6ee69', 'hex');
const iv  = Buffer.from('26ae5cc854e36b6bdfca366848dea6bb', 'hex');

export function decrypt(email) {
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    var dec = decipher.update(email, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}


export function encrypt(email){
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    var crypted = cipher.update(email,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

