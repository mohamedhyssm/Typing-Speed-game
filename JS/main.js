// catch Selectors

let container = document.querySelector(".game .container")

let lvlNameMessage = document.querySelector(".message .lvl");

let bestScore = document.querySelector(".game .best-score .best")

let secondsSpan = document.querySelector(".message .seconds");

let startButton = document.querySelector(".start");

let theWord = document.querySelector(".the-word");

let upcomingWords = document.querySelector(".upcoming-words");

let input = document.querySelector(".input");

let timeLeftSpan = document.querySelector(".time span");

let scoreGot = document.querySelector(".score .got");

let scoreTotal = document.querySelector(".score .total");

let finishMessage = document.querySelector(".finish");

let checkbox = document.querySelector(".game .container .checkbox")

let labelInputRadio = Array.from(document.querySelectorAll(".game .container .checkbox label"))


// Array Of Words

const words = ["Hello",
    "Program",
    "Code",
    "Script",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "wifi",
    "Internet",
    "Python",
    "Scala",
    "End",
    "Paradign",
    "Styling",
    "Cascade",
    "type",
    "Coding",
    "Funny",
    "Working",
    "Joking",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "good",
    "speed"
];

let wordsRemoved = []

// Setting Levels

const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
}

const score = {
    "Easy": 0,
    "Normal": 0,
    "Hard": 0
}

// Defult Level

let levelName = "Normal";
let levelSeconds = lvls[levelName];

// Setting Level Name + Seconds + Score :
// total score
scoreTotal.innerHTML = words.length;
// level name
lvlNameMessage.innerHTML = levelName;
// span seconds in message
secondsSpan.innerHTML = levelSeconds;
// span seconds in time Left
timeLeftSpan.innerHTML = levelSeconds;

// heigh score from local storage
if (localStorage.getItem("score")) {
    let lvlScore = JSON.parse(localStorage.getItem("score"))
    bestScore.innerHTML = JSON.parse(localStorage.getItem("score"))[levelName]
    score.Easy = lvlScore["Easy"]
    score.Normal = lvlScore["Normal"]
    score.Hard = lvlScore["Hard"]
}

// choose the level
labelInputRadio.forEach(label => {
    label.onclick = () => {
        // catch value in class label
        levelName = label.classList[0];
        // level Seconds
        levelSeconds = lvls[levelName];
        // level name
        lvlNameMessage.innerHTML = levelName;
        // span seconds in message
        secondsSpan.innerHTML = levelSeconds;
        // span seconds in time Left
        timeLeftSpan.innerHTML = levelSeconds;
        if (localStorage.getItem("score")) {
            bestScore.innerHTML = JSON.parse(localStorage.getItem("score"))[levelName]
        }
    }
})

// Disable Paste Event
input.onpaste = function () {
    return false
}

// Start Game
startButton.onclick = function () {
    // remove button checkbox and focus input to start writing
    this.remove();
    checkbox.remove();
    input.focus();
    input.value = ""
    // Generate Word Function
    genWords()
}

function genWords() {
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Add Random Word In Removed Array 
    wordsRemoved.push(randomWord);
    // Remove Word From Array
    words.splice(words.indexOf(randomWord), 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML = "";
    // Generate Words 
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div")
        div.appendChild(document.createTextNode(words[i]))
        upcomingWords.append(div)
    }
    // Call Start Play Function
    startPlay()
}

function startPlay() {
    timeLeftSpan.innerHTML = levelSeconds
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--
        if (timeLeftSpan.innerHTML === "0") {
            // Stop Timer
            clearInterval(start)
            // Compare Words
            if (theWord.innerHTML.toLowerCase() == input.value.toLowerCase()) {
                // Empty Input Field
                input.value = "";
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    genWords()
                }
                else {
                    let span = document.createElement("span");
                    span.className = "good"
                    span.appendChild(document.createTextNode("congratulations"))
                    finishMessage.append(span)
                    // Remove Upcoming Words Box
                    upcomingWords.style.display = "none";
                    // heigh score
                    heighScore()
                    // try again button
                    tryAgain()
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad"
                span.appendChild(document.createTextNode("Game Over"))
                finishMessage.append(span)
                // heigh score
                heighScore()
                // try again button
                tryAgain()
            }
        }
    }, 1000)
}

function heighScore() {
    if (localStorage.getItem("score")) {
        if (+JSON.parse(localStorage.getItem("score"))[levelName] < +scoreGot.textContent) {
            score[levelName] = +scoreGot.textContent
            localStorage.setItem("score", JSON.stringify(score))
            bestScore.innerHTML = score[levelName]
        }
    } else {
        score[levelName] = +scoreGot.textContent
        localStorage.setItem("score", JSON.stringify(score))
    }
}

function tryAgain() {
    words.push(...wordsRemoved)
    wordsRemoved = []
    // div checkbox
    let div = document.createElement("div")
    div.className = "checkbox"
    // span message
    let span = document.createElement("span")
    span.classList.add("choose")
    span.appendChild(document.createTextNode("choose the level : "))
    // input 
    let inputProperties = document.createElement("input")
    inputProperties.type = "radio";
    inputProperties.name = "lvl";
    inputProperties.className = "radio-check";
    // input 1 + label + span
    let firstInput = inputProperties.cloneNode()
    firstInput.id = "easy";
    let firstLabel = document.createElement("label")
    firstLabel.setAttribute("for", "easy")
    firstLabel.className = "Easy"
    firstLabel.appendChild(document.createTextNode("Eazy "))
    let firstSpan = document.createElement("span")
    firstSpan.appendChild(document.createTextNode("-"))
    // input 2 + label + span
    let secondInput = inputProperties.cloneNode()
    secondInput.id = "normal";
    let secondLabel = document.createElement("label")
    secondLabel.setAttribute("for", "normal")
    secondLabel.className = "Normal"
    secondLabel.appendChild(document.createTextNode(" Normal "))
    let secondSpan = document.createElement("span")
    secondSpan.appendChild(document.createTextNode("-"))
    // input 3 + label
    let thirdInput = inputProperties.cloneNode()
    thirdInput.id = "hard";
    let thirdLabel = document.createElement("label")
    thirdLabel.setAttribute("for", "hard")
    thirdLabel.className = "Hard"
    thirdLabel.appendChild(document.createTextNode(" Hard"))
    // append to div
    div.append(span)
    div.append(firstInput)
    div.append(firstLabel)
    div.append(firstSpan)
    div.append(secondInput)
    div.append(secondLabel)
    div.append(secondSpan)
    div.append(thirdInput)
    div.append(thirdLabel)
    // append to countainer
    container.append(div)

    // add event click again
    let labelInputRadio = Array.from(document.querySelectorAll(".game .container .checkbox label"))
    // choose the level
    labelInputRadio.forEach(label => {
        label.onclick = () => {
            // catch value in class label
            levelName = label.classList[0];
            // level name
            lvlNameMessage.innerHTML = levelName;
            // level Seconds
            levelSeconds = lvls[levelName];
            // span seconds in message
            secondsSpan.innerHTML = levelSeconds;
            // span seconds in time Left
            timeLeftSpan.innerHTML = levelSeconds;
            if (localStorage.getItem("score")) {
                bestScore.innerHTML = JSON.parse(localStorage.getItem("score"))[levelName]
            }
        }
    })
    // button try again
    let button = document.createElement("button")
    button.className = "start"
    button.appendChild(document.createTextNode("Click To Play again"))
    container.append(button)
    // add event click again
    button.onclick = function () {
        // remove button checkbox and focus input to start writing
        this.remove();
        div.remove();
        input.focus();
        input.value = ""
        // rest finish message 
        finishMessage.innerHTML = ""
        // Generate Word Function
        scoreGot.innerHTML = "0";
        genWords()
        upcomingWords.style.display = "flex";
    }
}