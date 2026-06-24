const lowerA = "a".charCodeAt(0);
const lowerZ = "z".charCodeAt(0);
const upperA = "A".charCodeAt(0);
const upperZ = "Z".charCodeAt(0);

const errorContainer = document.getElementById("error-text-container");
const errorText = document.getElementById("error-text");
const closeErrorButton = document.getElementById("close-error-text");

const settingLineCount = document.getElementById("practice-lines");
const settingLineCountLabel = document.getElementById("practice-lines-label");
const settingShowHint = document.getElementById("show-hint");
const settingShowHintLabel = document.getElementById("show-hint-label");

const writingButton = document.getElementById("practice-writing");
const readingButton = document.getElementById("practice-reading");
const textDisplay = document.getElementById("rot13-display");
const textInput = document.getElementById("rot13-input");
const outputElement = document.getElementById("output");

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
    ready();
  })
}).catch((error) => {
  console.log(error);
  errorText.textContent = "Error loading text file... try reloading?";
  errorContainer.style.display = "block";
})

// Customization/settings.
let upperCase = true;
let alphaOnly = false;
let numbers = true;
let showHint = false;
let practiceLines = 3;

function ready() {
  writingButton.disabled = false;
  readingButton.disabled = false;
  settingLineCount.value = practiceLines;
  settingLineCount.disabled = false;
  settingShowHint.checked = showHint;
  settingShowHint.disabled = false;
  updateSettingLineCount();
  readPractice();
}

function updateSettingLineCount() {
  settingLineCountLabel.textContent = "Practice lines: " + practiceLines;
}
function settingChangedPracticeLines() {
  practiceLines = Number(settingLineCount.value);
  updateSettingLineCount();
}
function settingChangedShowHint() {
  showHint = settingShowHint.checked;
  displayOutput();
}

let practiceText = "";
let practiceTextAnswer = "";

function getLine() {
  line = "";
  var startIndex = Math.floor(Math.random()*(sourceLines.length - practiceLines));
  // It shouldn't begin or end with a blank line.
  while (sourceLines[startIndex] === "" || sourceLines[startIndex + practiceLines - 1] === "") {
    startIndex = Math.floor(Math.random()*(sourceLines.length - practiceLines));
  }
  for (var i = startIndex; i < startIndex + practiceLines; ++i) {
    line += "\n" + sourceLines[i];
  }
  return line;
}

function practice() {
  practiceText = getLine();
  practiceText = practiceText.slice(1);
  practiceTextAnswer = rot13(practiceText);
  textDisplay.textContent = practiceText;
  textInput.value = "";
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

function displayOutput() {
  var outputHtml = "";
  for (var i = 0; i < textInput.value.length; ++i) {
    if (practiceTextAnswer.charAt(i) !== textInput.value.charAt(i)) {
      outputHtml += '<span class="wrong">' + practiceTextAnswer.charAt(i) + "</span>";
    } else {
      outputHtml += practiceTextAnswer.charAt(i);
    }
  }
  outputHtml += showHint ? '<span class="hint">' : '<span class="phantom">';
  outputHtml += practiceTextAnswer.slice(textInput.value.length, practiceTextAnswer.length);
  outputHtml += "</span>";
  outputElement.innerHTML = outputHtml;
}

function inputChanged() {
  displayOutput();
}

// Causes an element to rot13 its text.
function selfROT13(elem) {
  elem.innerText = rot13(elem.innerText);
}

function hideError() {
  errorContainer.style.display = "none";
}