//requiring path, fs and hash modules
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

//write the directory here
const dirname = "d:/";

//write the file where all will be save
const fileNameHash = "hashCodes.txt";
const fileNameImages = "imagesNames.txt";

//joining path of directory 
const directoryPath = path.join(dirname, 'example');

//create array with the list of all files
const filesArray = [...fs.readdirSync(directoryPath)];

//create array with the bitmap of all files
const bitmapArray = [];

//create array with the hash of all files
const hashArray = [];

const bitmapReader = () => {
    filesArray.map((file) => {
        // read binary data
        const bitmap = fs.readFileSync(directoryPath + "/" + file);
  
        bitmapArray.push(bitmap);
    });
}

const hashGenerator = () => {
    bitmapArray.map((bitmap) => {
        const hash = crypto.createHash('sha256');
        const hashResult = hash.update(bitmap, 'binary').digest('hex');

        hashArray.push(hashResult);
    });
}

const writeOnFile = () => {
    const writeOnFileHash = fs.createWriteStream(fileNameHash);
    const writeOnFileImages = fs.createWriteStream(fileNameImages);
    
    if(hashArray.length > 0) {
       hashArray.map((hash) => writeOnFileHash.write(hash + '\n'));
       filesArray.map((image) => writeOnFileImages.write(image + '\n'));
       console.log("Number of hash", hashArray.length);
    }
}

bitmapReader();
hashGenerator();
writeOnFile();


