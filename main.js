//Get document element
const text = document.querySelector("#text-display");
const input = document.querySelector("#input-field");
const restart = document.querySelector("#redo-button");
const result = document.querySelector("#right-wing");
const history = document.querySelector("#history");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");
const commandText = document.querySelector("#command-text");
const commandResult = document.querySelector(".command-result");
const clockIcon = document.querySelector('#clock-icon')
const closeIcon = document.querySelectorAll('.close-icon')

let wordsCount = 0
let historyBlanked = true
let index = 0
let currentLanguage = 'english'
let texts = ['Loading...']
let textsHogwarts = []
let normalTextsPt = []
let normalTextsEn = []


async function importTexts() {
    const res = await fetch('texts/texts.json')
    const json = await res.json()
    textsHogwarts = json["textsHogwarts"]
    normalTextsPt = json["normalTextsPt"]
    normalTextsEn = json["normalTextsEn"]
    texts = normalTextsEn
    newText()
}

function newText() {
    if(index >= 10) {
        index = 0
    }
    textChosen = texts[index]
    index++
    wordsCount = textChosen.split(" ").length
    text.textContent = textChosen
}

function updateTest() {
    start()

    if (input.value === text.textContent) {
        verify()
    }

    if (input.value.length >= text.textContent.length) {
        text.classList.add('wrong-phrase', 'animate__animated', 'animate__shakeX')
    } else {
        text.classList.remove("wrong-phrase", "animate__animated", "animate__shakeX")
    }
}

function start() {

    const testStatus = JSON.parse(localStorage.getItem("testInCourse")) // transform a string into a boolean

    if (!testStatus) {
        localStorage.setItem("startTime", new Date().getTime())
        localStorage.setItem("testInCourse", true)
        showClock()
    }
}

function verify() {
    const finalTime = new Date().getTime()
    const startTime = parseInt(localStorage.getItem("startTime"))
    const timeSpent = (finalTime - startTime) / 1000
    const WPM = Math.floor(wordsCount / (timeSpent / 60))
    result.textContent = `Seconds: ${timeSpent} / WPM: ${WPM}`

    result.classList.add("animate__animated", "animate__bounceIn")

    setTimeout(function () {
        result.classList.remove("animate__animated", "animate__bounceIn")
    }, 1000)

    addToHistory(text.textContent, timeSpent, WPM)
    localStorage.setItem("testInCourse", false)
    removeClock()
    input.value = ""
    newText()
}

function addToHistory(typedText, timeSpent, WPM) {

    if(historyBlanked) {
        history.classList.remove("hidden")
        document.getElementById("history-temp").classList.add("hidden")
    }

    const itemHistory = document.createElement("p")
    itemHistory.classList.add("history-card")

    itemHistory.textContent = `Text "${typedText}" - Seconds: ${timeSpent} / WPM: ${WPM}`

    history.appendChild(itemHistory)

    historyBlanked = false
}

function restartTest() {
    input.value = ""
    result.textContent = "Seconds: X.X / WPM: XX"
    newText()
    localStorage.setItem("testInCourse", false)
    removeClock()
    history.innerHTML = ""
    history.classList.add("hidden")
    document.getElementById("history-temp").classList.remove("hidden")
    text.classList.remove("wrong-phrase", "animate__animated", "animate__shakeX")
}

input.addEventListener("keyup", updateTest)
restart.addEventListener("click", restartTest)
localStorage.setItem("testInCourse", false)

importTexts()

function showClock() {
    document.getElementById("command-container").classList.add("hidden")
    clockIcon.classList.remove("hidden")
}

function removeClock() {
    document.getElementById("command-container").classList.remove("hidden")
    clockIcon.classList.add("hidden")
}

function commandTextEnglish() {
    commandText.textContent = "Type the text below correctly ↓"
}

function commandTextPortuguese() {
    commandText.textContent = "Digite o texto abaixo corretamente ↓"
}

function addAnimationBackInDown(element) {
    element.classList.add("animate__animated", "animate__backInDown", "animate__faster")
}

function removeAnimationBackInDown(element) {
    setTimeout(function () {
        element.classList.remove("animate__animated", "animate__backInDown", "animate__faster")
    }, 1000)
}

function showScreen(screenId, screenName) {
    footer.classList.add("hidden")
    document.getElementById(screenId).classList.remove("hidden");
    document.getElementById("command-center").classList.add("hidden");
    header.textContent = screenName
    addAnimationBackInDown(header)
    removeAnimationBackInDown(header)
}

function hideScreen(screen) {
    footer.classList.remove("hidden")
    document.getElementById(screen).classList.add("hidden");
    document.getElementById("command-center").classList.remove("hidden");
    header.textContent = "Typing Speed"
    addAnimationBackInDown(header)
    removeAnimationBackInDown(header)
}

function showHistoryCenter() {
    showScreen("history-center", "History")
}

function hideHistoryCenter() {
    hideScreen("history-center")
}

function showThemeCenter() {
    showScreen("theme-center", "Themes")
}

function hideThemeCenter() {
    hideScreen("theme-center")
}

function showLanguageCenter() {
    showScreen("language-center", "Language")
}

function hideLanguageCenter() {
    hideScreen("language-center")
}

async function setLanguage(_language) {
    const language = _language.toLowerCase()

    if(language === 'portuguese') {
        texts = normalTextsPt
        index = 0
        currentLanguage = 'portuguese'
        newText()
        commandTextPortuguese()
        hideLanguageCenter()
    } else if(language === 'english') {
        texts = normalTextsEn
        index = 0
        currentLanguage = 'english'
        newText()
        commandTextEnglish()
        hideLanguageCenter()
    }

}

async function setTheme(_theme) {
    const theme = _theme.toLowerCase();

    if(theme === 'hogwarts') {
        texts = textsHogwarts
        index = 0
        commandTextEnglish()
        newText()
    } else {
        if(currentLanguage === 'english') {
            texts = normalTextsEn
        } else if(currentLanguage === 'portuguese') {
            texts = normalTextsPt
        }
        index = 0
        newText()
    }

    changeClockColor(theme)

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

function changeClockColor(theme) {
    switch (theme) {
        case 'light':
            clockIcon.setAttribute('colors', 'primary:#000000')
            closeIcon.forEach((element) => {
                element.setAttribute('colors', 'primary:#000000')
            })
            break
        case 'aurora':
            clockIcon.setAttribute('colors', 'primary:#ffffff')
            closeIcon.forEach((element) => {
                element.setAttribute('colors', 'primary:#ffffff')
            })
            break
        case 'hogwarts':
            clockIcon.setAttribute('colors', 'primary:#ffffff')
            closeIcon.forEach((element) => {
                element.setAttribute('colors', 'primary:#ffffff')
            })
            break
        case 'yuri':
            clockIcon.setAttribute('colors', 'primary:#e83a30')
            closeIcon.forEach((element) => {
                element.setAttribute('colors', 'primary:#e83a30')
            })
            break
        default:
            clockIcon.setAttribute('colors', 'primary:#000000')
            closeIcon.forEach((element) => {
                element.setAttribute('colors', 'primary:#000000')
            })
    }
}