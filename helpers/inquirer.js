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
                name: '3.'.green + ' Change a password'
            },
            {
                value: '4',
                name: '4.'.green + ' Exit'
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
const readInput = async( text ) => {
    const question = [ 
        {
            type: 'input',
            name: 'target',
            message: text,
            validate( value ) {
                if ( value.length === 0 ) {
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



module.exports = {
    mainMenu,
    changePassMenu,
    pause,
    readInput
}