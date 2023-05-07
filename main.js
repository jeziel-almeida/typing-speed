//Get document element
const text = document.querySelector("#text-display");
const input = document.querySelector("#input-field");
const restart = document.querySelector("#redo-button");
const result = document.querySelector("#right-wing");
const history = document.querySelector("#history");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");


let wordsCount = 0
let historyBlanked = true
let index = 0
//let currentTheme = ''

const textsHogwarts = [
    "When in doubt, go to the library",
    "I solemnly swear that I am up to no good",
    "Hogwarts will always be there to welcome you home",
    "Don't let the muggles get you down",
    "It does not do to dwell on dreams and forget to live",
    "I mean, it's sort of exciting, isn't it, breaking the rules?",
    "Wit beyond measure is man's greatest treasure",
    "Once again, you show all the sensitivity of a blunt axe",
    "Anyone can speak Troll. All you have to do is point and grunt",
    "We are only as strong as we are united, as weak as we are divided"
]

const normalTextsPt = [
    "Enquanto eu tiver perguntas e não houver resposta continuarei a escrever",
    "Ela acreditava em anjo e, porque acreditava, eles existiam",
    "Liberdade é pouco. O que desejo ainda não tem nome",
    "E o que o ser humano mais aspira é tornar-se ser humano",
    "Passei a vida tentando corrigir os erros que cometi na minha ânsia de acertar",
    "Divertir os outros é um dos modos mais emocionantes de existir",
    "Cada qual sabe amar a seu modo; o modo, pouco importa; o essencial é que saiba amar",
    "O destino, como todos os dramaturgos, não anuncia as peripécias nem o desfecho",
    "Defeitos não fazem mal, quando há vontade e poder de os corrigir",
    "Podemos julgar o coração de um homem pela forma como ele trata os animais"
]

const normalTextsEn = [
    "There can always be healing, even if there is no cure",
    "What you do is more important than what you say",
    "It's better to finish something late than to never do it at all",
    "A journey of a thousand miles begins with a single step",
    "Anxiety weighs down the heart, but a kind of words cheers it up",
    "All that is gold does not glitter, not all those who wander are lost",
    "Still round the corner there may wait a new road or a secret gate",
    "All we have to decide is what to do with the time that is given us",
    "There is a wisdom of the head, and a wisdom of the heart",
    "No one is useless in this world who lightens the burden of it to anyone else"
]

let texts = normalTextsEn

function newText() {
    // const index = Math.floor(Math.random() * texts.length)
    // textChosen = texts[index]
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
    }
}

function verify() {
    const finalTime = new Date().getTime()
    const startTime = parseInt(localStorage.getItem("startTime"))
    const timeSpent = (finalTime - startTime) / 1000
    const WPM = Math.floor(wordsCount / (timeSpent / 60))
    result.textContent = `Seconds: ${timeSpent} / WPM: ${WPM}`

    addToHistory(text.textContent, timeSpent, WPM)

    localStorage.setItem("testInCourse", false)
    input.value = ""
    newText()
}

function addToHistory(typedText, timeSpent, WPM) {

    if(historyBlanked) {
        history.innerHTML = ""
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
    history.innerHTML = ""
}

input.addEventListener("keyup", updateTest)
restart.addEventListener("click", restartTest)

newText()


function showHistoryCenter() {
    footer.classList.add("hidden")
    document.getElementById("history-center").classList.remove("hidden");
    document.getElementById("command-center").classList.add("hidden");
    header.textContent = "History"
    header.classList.add("animate__animated", "animate__backInDown")
    setTimeout(function () {
        header.classList.remove("animate__animated", "animate__backInDown")
    }, 1000)
}

function hideHistoryCenter() {
    footer.classList.remove("hidden")
    document.getElementById("history-center").classList.add("hidden");
    document.getElementById("command-center").classList.remove("hidden");
    header.textContent = "Typing Speed"
    header.classList.add("animate__animated", "animate__backInDown")
    setTimeout(function () {
        header.classList.remove("animate__animated", "animate__backInDown")
    }, 1000)
}


function showThemeCenter() {
    footer.classList.add("hidden")
    document.getElementById("theme-center").classList.remove("hidden");
    document.getElementById("command-center").classList.add("hidden");
    header.textContent = "Themes"
    header.classList.add("animate__animated", "animate__backInDown")
    setTimeout(function () {
        header.classList.remove("animate__animated", "animate__backInDown")
    }, 1000)
}

function hideThemeCenter() {
    footer.classList.remove("hidden")
    document.getElementById("theme-center").classList.add("hidden");
    document.getElementById("command-center").classList.remove("hidden");
    header.textContent = "Typing Speed"
    header.classList.add("animate__animated", "animate__backInDown")
    setTimeout(function () {
        header.classList.remove("animate__animated", "animate__backInDown")
    }, 1000)
}

function showLanguageCenter() {
    footer.classList.add("hidden")
    document.getElementById("language-center").classList.remove("hidden");
    document.getElementById("command-center").classList.add("hidden");
    header.textContent = "Language"
    header.classList.add("animate__animated", "animate__backInDown")
    setTimeout(function () {
        header.classList.remove("animate__animated", "animate__backInDown")
    }, 1000)
}

function hideLanguageCenter() {
    footer.classList.remove("hidden")
    document.getElementById("language-center").classList.add("hidden");
    document.getElementById("command-center").classList.remove("hidden");
    header.textContent = "Typing Speed"
    header.classList.add("animate__animated", "animate__backInDown")
    setTimeout(function () {
        header.classList.remove("animate__animated", "animate__backInDown")
    }, 1000)
}

async function setLanguage(_language) {
    const language = _language.toLowerCase()

    if(language === 'portuguese') {
        texts = normalTextsPt
        index = 0
        newText()
    } else if(language === 'english') {
        texts = normalTextsEn
        index = 0
        newText()
    }

}

async function setTheme(_theme) {
    const theme = _theme.toLowerCase();

    if(theme === 'hogwarts') {
        texts = textsHogwarts
        index = 0
        newText()
    } else {
        texts = normalTexts
        index = 0
        newText()
    }

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
