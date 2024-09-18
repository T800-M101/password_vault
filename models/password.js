const { v4: uuidv4 } = require('uuid');


class Password {
   
    constructor(target, pass){
     
        this.id = uuidv4();
        this.protectedTarget = target.toLowerCase();
        this.password = pass;
    }
}


module.exports = Password;