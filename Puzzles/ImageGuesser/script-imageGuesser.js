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
    for(let i=0; i<numLetters; i++){
        const input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', 1);
        input.setAttribute('placeholder', '_');
        input.setAttribute('id', 'image-text');
        const captionDiv = document.getElementById("image-text-container");
        captionDiv.appendChild(input);
    }
}