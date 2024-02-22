const fs = require('fs');


const  replaceFileContent= async (filePath, newData) => {
    // Open the file in write mode
    await fs.writeFileSync(filePath, newData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('File content replaced successfully!');
    });
}

module.exports={replaceFileContent}
