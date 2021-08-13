//requiring fs and readline modules
const fs = require('fs');

//read the file where the hash and images are saved
const fileNameHash = "hashCodes.txt";
const fileNameImages = "imagesNames.txt";

//create array with the list of hash codes and images list
const dataHash = fs.readFileSync(fileNameHash, 'utf8');
const hashArray = dataHash.split(/\r?\n/);
const dataImages = fs.readFileSync(fileNameImages, 'utf8');
const imagesArray = dataImages.split(/\r?\n/);

//how many hash are equal
let count = 0;

//what is the hash that are equal
const hashArrayEqual = [];

//what is the image that are equal
const imageArrayEqual = [];

const compareHash = () => {
    const hashList = [];

    hashArray.forEach((line, mainIndex) => {
        const newArrayList = [mainIndex];

        hashArray.forEach((hash, secondaryIndex) => {
            if (hash === line && mainIndex !== secondaryIndex) {
                newArrayList.push(secondaryIndex);
            }
        });

        if (newArrayList.length > 1) {
            hashList.push(newArrayList);
        }
    })

    if (hashList.length > 0) {
        count = hashList.length;
        hashList.forEach((array) => hashArrayEqual.push(array));
    }
}

const createImagesListNameEqual = () => {
    if (hashArrayEqual.length > 0) {
        hashArrayEqual.forEach((array) => {
            const newArray = [];

            array.forEach((index) => {
                newArray.push(imagesArray[index]);
            });

            imageArrayEqual.push(newArray);
        });
    }
}

compareHash();
createImagesListNameEqual();

console.log("Number: ", count);
console.log("HashList: ", hashArrayEqual);
console.log("ImageList: ", imageArrayEqual);