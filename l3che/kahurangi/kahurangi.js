var menu = {};
var current_menu;

function enable_menu(menu) {
  current_menu.style.display = "none";
  current_menu = menu;
  current_menu.style.display = "block";
}

var state;
function resetState() {
  state = {
  // "questions" object Format:
  // answers: (String name, bool is_correct)
  // compound: Compound
  // }
  questions: [],
  current_index: 0,
  correct_questions: 1,
  };
}

// spectra can contain up to one of each:
// - 'ir'
// - 'nmr'
// - 'mass'
// Corresponding to what spectra are used to identify the compound in a given
// question.
function make_question(compound, hard=false, spectra=["ir", "nmr", "mass"]) {
  // String is name, boolean is whether it is correct or not.
  var compounds = [];
  compounds.push((compound.name, True))
  for (var i = 0; i < compound_info.length; ++i) {
    var wrong_compound = compound_info
    if (hard) {
      var hard_hint = spectra[Math.floor(Math.random() * spectra.length)];
      console.log(hard_hint);
    }
    if ("ir" in spectra) {
      if (hard_hint === "ir") {
        TODO
      }
    }
  }
}

function start_quiz() {
  enable_menu(menu.quiz);
}

function end_quiz() {
  enable_menu(menu.home);
}

function setup() {
  menu.home = document.getElementById("menu-home");
  menu.quiz = document.getElementById("menu-quiz");
  menu.results = document.getElementById("menu-results");
  current_menu = menu.home;
  current_menu.style.display = "block";

  // The very end...
  var start_button = document.getElementById("start-button");
  start_button.innerText = "Start new quiz...";
  start_button.disabled = false;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOMContentLoaded");
    setup();
  });
} else {
  console.log("DOM Content already loaded!");
  setup();
}