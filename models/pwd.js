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
        
        for( const pass of this.pwdsList) {
            const index = `${ (i + '.').green }`;
            const { protectedTarget, user, password } = pass;
            console.log(`${index} ${protectedTarget} :: ${user} :: ${password}`);
            i++;
        }

        if (this.pwdsList.length === 0) console.log('***** THERE ARE NO PASSWORDS YET *****'.green);
    }

    changeUserOrPassword(id, userOrPass, user=false) {

        if (this._pwds[id]) {
            if ( user ) {
                this._pwds[id].user = userOrPass; 
            } else {
                const encryptedPass = encryptPassword(userOrPass);
                this._pwds[id].password = encryptedPass;
            }
        }

        

        return user ? '***** User was changed successfully *****'.toUpperCase().green : '***** Password was changed successfully *****'.toUpperCase().green;
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

            if ( pass.protectedTarget === item.toLowerCase()) {
                const decriptedPass = decryptPassword(pass.password);
                response = '***** '.green + `${decriptedPass}` + ' *****'.green
                break;
            } 
        }
        
        return response;

    }


}


module.exports = PWD;