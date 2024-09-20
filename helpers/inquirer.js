const inquirer = require('inquirer');
const colors = require('colors');


const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do',
        choices: [
            {
                value: '1',
                name: '1.'.green + ' Create new password'
            },
            {
                value: '2',
                name: '2.'.green + ' List all passwords'
            },
            {
                value: '3',
                name: '3.'.green + ' Change password'
            },
            {
                value:'4',
                name: '4.'.green + ' Get password'
            },
            {
                value: '5',
                name: '5.'.green + ' Delete password'
            },
            {
                value: '6',
                name: '6.'.green + ' Exit'
            },
        ]
    }
];

const mainMenu = async() => {

    console.clear();
    console.log('==============================='.green);
    console.log('          Menu options');
    console.log('===============================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;

}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'pause',
            message: `Press ${'ENTER'.green} to continue`,
            choices: []
        }
    ]
    
    console.log('\n');
    /* In this case it is not required to return anything, just cause a pause*/
    await inquirer.prompt(question);

}

// The validate function is to enforce the input of a value
const readInput = async( text, enforce=true ) => {
    
    const question = [ 
        {
            type: 'input',
            name: 'target',
            message: text,
            validate( value ) {
                if ( enforce && value.length === 0 ) {
                    return 'Please, write a target to protect.'
                }
                return true;
            } 
        }
    ];

    const { target } = await inquirer.prompt(question);
    // returns a string (the user input)
    return target;
}

const changePassMenu = async (passwords) => {
    const choices = passwords.map( ( pass, i ) => {
        const index = `${i + 1}.`.green;
        return {
            value: pass.id,
            name: `${index} ${pass.protectedTarget}`
        }
    });

    choices.push({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Change',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    // returns a string
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    // returns a boolean
    return ok;
}



module.exports = {
    mainMenu,
    changePassMenu,
    pause,
    readInput,
    confirm
}