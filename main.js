var wordToNumber = {
    'zero': 0,
    'um': 1,
    'dois': 2,
    'tres': 3,
    'quatro': 4,
    'cinco': 5,
    'seis': 6,
    'sete': 7,
    'oito': 8,
    'nove': 9
}

var x = 0
var y = 0

var screenWidth = 0;
var screenHeight = 0;

var drawApple = "";

var apple = "";
var speakData = "";
var toNumber = 0;

function preload() {
    apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("status").innerHTML = "O sistema está ouvindo. Por favor, fale";
    recognition.start();
}

function convertWordsToNumber(words) {
    var number = 0;
    var currentNumber = 0;

    words.forEach(function (word) {
        var lowercasedWord = word.toLowerCase();

        if (lowercasedWord in wordToNumber) {
            var wordValue = wordToNumber[lowercasedWord];

            if (wordValue === 100 || wordValue === 1000 || wordValue === 1000000) {
                currentNumber *= wordValue;
                number + currentNumber;
                currentNumber = 0;
            } else {
                currentNumber += wordValue;
            }
        }
    });

    return number + currentNumber;
}

recognition.onresult = function (event) {
    console.log(event);

    content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content;

    var words = content.split(' ');
    toNumber = convertWordsToNumber(words);

    if (!isNaN(toNumber)) {
        document.getElementById("status").innerHTML = "A maçã começou a ser desenhada.";
        drawApple = "set";
    } else {
        document.getElementById("status").innerHTML = "O número não foi reconhecido.";
    }
}

function setup() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas = createCanvas(screenWidth, screenHeight - 150);
    canvas.position(0, 150);
}

function draw() {
    if (drawApple == "set") {
        for (var i = 1; i <= toNumber; i++) {
            x = Math.floor(Math.random() * 700);
            y = Math.floor(Math.random() * 400);
            image(apple, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = toNumber + " Maçãs desenhadas";
        speakData = toNumber + " Maçãs desenhadas";
        speak();
        drawApple = "";
    }
}

function speak() {
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speakData);

    synth.speak(utterThis);

    speakData = "";
}
