let randomImageNum;

function loadImageGuesser() {
    getText('imageLinks.txt')
    .then(image => getImage(image));
    getText('imageText.txt')
    .then(displayCaption);
}

// read files
async function getText(file) {
    let fetchedFile = await fetch(file);
    let text = await fetchedFile.text();
    return text;
}

function getImage(image) {
    let imageArr = image.split("\n"); // convert text string to array
    randomImageNum = Math.floor(Math.random() * imageArr.length);
    let randomImageLink = imageArr[randomImageNum];
    document.getElementById("image").src = randomImageLink;
}

function displayCaption(text) {
    let textArr = text.split("\n");
    let captionText = textArr[randomImageNum];
    captionText = captionText.replace(/[\r\n]+/gm, "");
    let numLetters = captionText.length;
    let underlines = '';
    for(let i=0; i<numLetters; i++){
        underlines = underlines.concat(" _");
    }
    document.getElementById("image-text").textContent = underlines;
}