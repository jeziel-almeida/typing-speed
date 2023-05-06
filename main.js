//Get document element
const textDisplay = document.querySelector("#text-display");
const inputField = document.querySelector("#input-field");

//Initialize typing mode variables
let typingMode = 'wordcount';
let wordCount = 10;
document.querySelectorAll('#word-count > span').forEach(e => (e.style.borderBottom = ''));
document.querySelector('#wc-10').style.borderBottom = '2px solid';

//Initialize dynamic variables
let wordList = [];
let randomWords = [];
let currentWord = 0;
let correctKeys = 0;
let timerActive = false;

setLanguage('portuguese');

function setWordCount(wc) {
    wordCount = wc;
    document.querySelectorAll('#word-count > span').forEach(e => (e.style.borderBottom = ''));
    document.querySelector(`#wc-${wordCount}`).style.borderBottom = '2px solid';
    setText();
}

function setLanguage(_lang) {
    const lang = _lang.toLowerCase();
    fetch('texts/random.json')
        .then(response => response.json())
        .then(json => {
            if(typeof json[lang] !== 'undefined') {
                randomWords = json[lang];

                textDisplay.style.direction = "ltr";
                inputField.style.direction = "ltr";

                setText();
            } else {
                console.error(`language ${lang} is undefine`);
            }
        })
        .catch(err => console.error(err));
}

function setText(e) {
    e = e || window.event;
    var keepWordList = e && e.shiftKey;

    //Reset
    if(!keepWordList) {
        wordList = [];
    }
    currentWord = 0;
    correctKeys = 0;
    inputField.value = "";
    //timerActive = false;
    //clearTimeout(timer);
    textDisplay.style.display = 'block';
    inputField.className = '';

    //switch(typingMode) case 'wordcount':
    textDisplay.style.height = 'auto';
    textDisplay.innerHTML = '';

    if(!keepWordList) {
        wordList = [];
        while (wordList.length < wordCount) {
            const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
            if(wordList[wordList.length - 1] !== randomWord || wordList[wordList.length - 1] === undefined) {
                wordList.push(randomWord);
            }
        }
        
    }

    showText();
    //inputField.focus();
}

function showText() {
    wordList.forEach(word => {
        let span = document.createElement('span');
        span.innerHTML = word + ' ';
        textDisplay.appendChild(span);
    });
    textDisplay.firstChild.classList.add('highlight');
}






function showThemeCenter() {
    document.getElementById("theme-center").classList.remove("hidden");
    document.getElementById("command-center").classList.add("hidden");
}

function hideThemeCenter() {
    document.getElementById("theme-center").classList.add("hidden");
    document.getElementById("command-center").classList.remove("hidden");
}

async function setTheme(_theme) {
    const theme = _theme.toLowerCase();

    try {
        const resultado = await fetch(`themes/${theme}.css`);
        if(resultado.ok) {
            document.querySelector('#theme').setAttribute('href', `themes/${theme}.css`);
            return;
        }
        throw new Error("Tema não encontrado!");
    
    } catch(erro) {
        console.log(erro);
    }
}



inputField.addEventListener('keydown', e => {
    if(e.altKey) {
        if(e.key === 'l') {
            setLanguage(inputField.value);
        }
    }
})