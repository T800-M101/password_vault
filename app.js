const { mainMenu, pause, readInput, changePassMenu, confirm } = require('./helpers/inquirer');
const PWD = require('./models/pwd');
const Password = require('./models/password');
const { readFile, saveFile } = require('./helpers/save');


console.clear();
const main = async () => {
   
    let opt = '';
    const passManager = new PWD();
    const passFile = readFile();
  

    if (passFile) passManager.loadPassFile(passFile);
    
    do {
        opt = await mainMenu();
        switch (opt) {
            case '1':
                const target = await readInput('Target to protect:');
                const pass = await readInput('Password:');
                const response = passManager.createPass(target, pass);
                console.log(response);
                break;
            case '2':
                passManager.listAllPasswords();
                break;
            case '3':
                const id = await changePassMenu(passManager.pwdsList);
                if (id !== '0') {
                    const newPassword = await readInput('new password?');
                    const response = passManager.changePassword(id, newPassword);
                    console.log(response)
                } 
                break;
            case '4':
                const item = await readInput('What target?');
                const password = passManager.getPass(item);
                console.log(password);
                break;
            case '5':
                const deleteId = await changePassMenu(passManager.pwdsList);
                if ( deleteId !== '0' ) {
                    const ok = await confirm('Are you sure?');
                    if ( ok ) {
                        const response = passManager.deletePassword( deleteId );
                        console.log(response);
                    }
                }
                break;
        }

        saveFile(passManager.pwdsList);
        await pause();

    } while (opt !== '6')

}

main();