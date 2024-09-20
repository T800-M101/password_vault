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

    createPass(target, user, pass) {
      
        for ( const pass of this.pwdsList ) {
            if (pass.protectedTarget == target.toLowerCase()) return 'Cannot create. Target already in the list'.red;
        }

        const encryptedPass = encryptPassword(pass);
        const password = new Password(target, user, encryptedPass);
        this._pwds[password.id] = password;

        return '***** Item created *****'.toUpperCase().green;
    }

    listAllPasswords() {
        console.log();
        let i = 1;
    
        for( const pass of this.pwdsList.sort() ) {
            const index = `${ (i + '.').green }`;
            const { protectedTarget, user, password } = pass;
            console.log(`${index} ${protectedTarget} :: ${user} :: ${password}`);
            i++;
        }

        if (this.pwdsList.length === 0) console.log('***** THERE ARE NO PASSWORDS YET *****'.green);
    }

    changePassword(id, newPass) {

        if (this._pwds[id]) {
            const encryptedPass = encryptPassword(newPass);
            this._pwds[id].password = encryptedPass;
        }

        return '***** Password was changed successfully *****'.toUpperCase().green;
    }

    deletePassword(id) {
        if ( this._pwds[id] ) {
           delete this._pwds[id];
        }
        return '***** Password deleted *****'.toLocaleUpperCase().green;
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