const { v4: uuidv4 } = require('uuid');


class Password {
    
    constructor(target, user='***', pass){
     
        this.id = uuidv4();
        this.protectedTarget = target.toLowerCase();
        this.user = user;
        this.password = pass;
    }
}


module.exports = Password;