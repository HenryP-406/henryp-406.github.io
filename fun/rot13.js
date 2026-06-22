const lowerA = "a".charCodeAt(0);
const lowerZ = "z".charCodeAt(0);
const upperA = "A".charCodeAt(0);
const upperZ = "Z".charCodeAt(0);

const writingButton = document.getElementById("practice-writing");
const readingButton = document.getElementById("practice-reading");
const textDisplay = document.getElementById("rot13-display");
const textInput = document.getElementById("rot13-input");
const outputElement = document.getElementById("output");
const errorContainer = document.getElementById("error-text-container");
const errorText = document.getElementById("error-text");
const closeErrorButton = document.getElementById("close-error-text");

function rot13(text) {
  let output = "";
  for (let i=0;i < text.length;++i) {
    let code = text.charCodeAt(i);
    if (code > lowerZ || code < upperA || (code > upperZ && code < lowerA)) {
      output += text[i];
      continue;
    }

    const state = code & 96;
    code = code & 31;
    code = (code + 12) % 26 + 1;
    code = code | state;
    output += String.fromCharCode(code);
  }
  return output;
}

let sourceText = "";
let sourceLines = [];
fetch("/data/nineteen-eighty_four.txt").then((data) => {
  data.text().then((text) => {
    sourceText = text;
    sourceLines = sourceText.split("\n");
    console.log(text);
    ready();
  })
}).catch((error) => {
  console.log(error);
  errorText.textContent = "Error loading text file... try reloading?";
  errorContainer.style.display = "block";
})

function ready() {
  writingButton.disabled = false;
  readingButton.disabled = false;
  readPractice();
}

// Text is unchanged by default.
let upperCase = true;
let alphaOnly = false;
let numbers = true;
let practiceLines = 5;

let practiceText = "";
let practiceTextAnswer = "";
function practice() {
  practiceText = "";
  var startIndex = Math.floor(Math.random()*(sourceLines.length - practiceLines));
  while (sourceLines[startIndex] === "") {
    startIndex = Math.floor(Math.random()*(sourceLines.length - practiceLines));
  }
  for (var i = startIndex; i < startIndex + practiceLines; ++i) {
    practiceText += "\n" + sourceLines[i];
  }
  practiceText = practiceText.slice(1);
  practiceTextAnswer = rot13(practiceText);
  textDisplay.textContent = practiceText;
  textInput.textContent = "";
  inputChanged();
}

function readPractice () {
  practice();
  const temp = practiceText;
  practiceText = practiceTextAnswer;
  practiceTextAnswer = temp;
  textDisplay.textContent = practiceText;
  inputChanged();
}

function inputChanged() {
  if (textInput.value.length > practiceText.length) {
    textInput.value = textInput.value.slice(0, practiceText.length);
  }
  var outputHtml = "";
  for (var i = 0; i < practiceTextAnswer.length; ++i) {
    if (i >= textInput.value.length) {
      outputHtml += '<span class="empty">' + practiceTextAnswer.charAt(i) + "</span>";
      continue;
    }
    if (practiceTextAnswer.charAt(i) !== textInput.value.charAt(i)) {
      outputHtml += '<span class="wrong">' + practiceTextAnswer.charAt(i) + "</span>";
    } else {
      outputHtml += practiceTextAnswer.charAt(i);
    }
  }
  outputElement.innerHTML = outputHtml;
}

// Causes an element to rot13 its text.
function selfROT13(elem) {
  elem.innerText = rot13(elem.innerText);
}

function hideError() {
  errorContainer.style.display = "none";
}