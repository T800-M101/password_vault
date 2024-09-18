const colors = require('colors');
const Password = require("./password");


class PWD {

    constructor(){
        this._pwds = {};
    }

    get pwdsList() {
        return Object.values(this._pwds);
    }

    createPass(target, pass) {
        const password = new Password(target, pass);
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

}


module.exports = PWD;