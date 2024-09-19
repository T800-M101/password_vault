const crypto = require('crypto');
// Load environment variables from .env file
require('dotenv').config();



const secretKey = process.env.SECRET_KEY;
const iv = process.env.IV;
const algorithm = process.env.ALGORITHM;

// Convert secretKey and iv from hex strings to Buffers
const keyBuffer = Buffer.from(secretKey, 'hex');
const ivBuffer = Buffer.from(iv, 'hex');

// Function to encrypt the password
const encryptPassword = (password) => {
    try {
        const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
        
    } catch (error) {
        console.error("Encryption Error:", error);
    }
}

// Function to decrypt the password
const decryptPassword = (encryptedPassword) => {
    try {
        const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
        let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
        
    } catch (error) {
        console.error("Decryption Error:", error);   
    }
}

module.exports = {
    encryptPassword,
    decryptPassword
}