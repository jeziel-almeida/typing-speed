//Get document element
const text = document.querySelector("#text-display");
const input = document.querySelector("#input-field");
const restart = document.querySelector("#redo-button");
const result = document.querySelector("#right-wing");

wordsCount = 0

const texts = [
    "When in doubt, go to the library",
    "I solemnly swear that I am up to no good",
    "Hogwarts will always be there to welcome you home",
    "Don't let the muggles get you down",
    "It does not do to dwell on dreams and forget to live",
]

function newText() {
    const index = Math.floor(Math.random() * texts.length)
    textChosen = texts[index]
    wordsCount = textChosen.split(" ").length
    text.textContent = textChosen
}

function updateTest() {
    start()

    if (input.value === text.textContent) {
        verify()
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

    result.textContent = `WPM: ${WPM}`

    //addToHistory(text.textContent, WPM)

    localStorage.setItem("testInCourse", false)
    input.value = ""
    newText()
}

function addToHistory(typedText, WPM) {
    const itemHistory = document.createElement("p")

    itemHistory.textContent = `Text "${typedText}" - WPM: ${WPM}`

    history.appendChild(itemHistory)
}

function restartTest() {
    input.value = ""
    result.textContent = "WPM: XX"
    newText()
    localStorage.setItem("testInCourse", false)
    //history.innerHTML = ""
}

input.addEventListener("keyup", updateTest)
restart.addEventListener("click", restartTest)

newText()





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
