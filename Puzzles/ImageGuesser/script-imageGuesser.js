function loadImageGuesser() {
    getText('imageLinks.txt')
    .then(text => getImage(text));
}

// read files
async function getText(file) {
    let fetchedFile = await fetch(file);
    let text = await fetchedFile.text();
    return text;
}

function getImage(text) {
    
    document.getElementById("image").src = "Images/big-mac.jpg";
}