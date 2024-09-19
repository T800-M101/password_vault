const colors = require('colors');
const Password = require("./password");
const { encryptPassword, decryptPassword } = require('../crypto/crypto');

class PWD {

    constructor(){
        this._pwds = {};
    }

    get pwdsList() {
        return Object.values(this._pwds);
    }

    createPass(target, pass) {
        const encryptedPass = encryptPassword(pass);
        const password = new Password(target, encryptedPass);
        this._pwds[password.id] = password;

        return '***** Item created *****'.toUpperCase().green;
    }

    listAllPasswords() {
        console.log();
        let i = 1;
        for( const pass of this.pwdsList ) {
            const index = `${ (i + '.').green }`;
            const { protectedTarget, password } = pass;
            console.log(`${index} ${protectedTarget} :: ${password}`);
            i++;
        }
    }

    changePassword(id, newPass) {
        if (this._pwds[id]) {
            this._pwds[id].password = newPass;
        }

        return '***** Password was changed successfully *****'.toUpperCase().green;
    }

    loadPassFile(file) {
        for (const pass of file ) {
            this._pwds[pass.id] = pass; 
        }
    }

    getPass(item) {
        let response = 'NO SUCH TARGET'.red;
        
        for ( const pass of this.pwdsList ) {
            if ( pass.protectedTarget === item.toLowerCase()) response = pass.password;
        }
        const decripedPass = decryptPassword(response);
        
        return '***** '.green + `${decripedPass}` + ' *****'.green;
        
    }

}


module.exports = PWD;