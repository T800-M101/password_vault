const fs = require('fs');
const path = require('path');
const os = require('os');


// Get the home directory
const homeDir = os.homedir();

// Create the full path to the file in the home directory
const file = path.join(homeDir, '/here the name of your file to store your passwords');


// Save file
const saveFile = ( data ) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

// Read the file
const readFile = () => {
    
    if( !fs.existsSync(file) ) return;
    
    const info = fs.readFileSync(file, { encoding: 'utf-8' });
    
    return JSON.parse(info);
}


module.exports = {
    saveFile,
    readFile
}