// If anything in this file is wrong, please, correct it!
// I can't guarantee I got it all right, though I tried.
let example_compound = {
  // This one is just an example!
  name: "pent-1-en-2-ol",
  // Relevant for both Infrared Radiation and C-NMR.
  // OH1 is the alcohol that produces a symmetric IR.
  // ene refers to an element that has a -ene.
  groups: ["oh1", "ene"],
  c_env: 5,
  mass: 86,
  // Only ones to be quizzed will have this.
  url: {
    // Only present when an image exists for the IR.
    ir: "",
    // Only present when an image exists for the C-NMR.
    nmr: "",
    // Only present when an image exists for the mass spectrometry.
    mass: "",
  }
}

// I'll work through this in order of groups:
//
// And then for each group, in order of carbon count, from 1~8.
// PLEASE do this, so that if progress is paused, picking up from where it was
// is easy.
//
// Because there are so many, complex compounds will only be included if they
// have a quizzable spectra.
//
// Finally, unless a compound has a spectroscopy image (up to three, for each
// kind), it will not be quizzed, but only included as an (incorrect) answer.
// Each image is a link to the image URL.

var compounds = [
  // Alkanes
  { name: "methane",
    groups: ["C-H"],
    c_env: 1,
    mass: 16 },
  { name: "ethane",
    groups: ["C-H", "C-C"],
    c_env: 2,
    mass: 30 },
  { name: "propane",
    groups: ["C-H", "C-C"],
    c_env: 2,
    mass: 44 },
  { name: "butane",
    groups: ["C-H", "C-C"],
    c_env: 2,
    mass: 58 },
  { name: "pentane",
    groups: ["C-H", "C-C"],
    c_env: 3,
    mass: 72 },
  { name: "hexane",
    groups: ["C-H", "C-C"],
    c_env: 3,
    mass: 86 },
  { name: "heptane",
    groups: ["C-H", "C-C"],
    c_env: 4,
    mass: 100 },
  { name: "octane",
    groups: ["C-H", "C-C"],
    c_env: 4,
    mass: 114 },
  { name: "test",
    groups: ["C-H", "C=C", "C=O"],
    c_env: 0,
    mass: 1000,
    ir: "./Placeholder_Sprite.png"
  }
];

function groups_match(compound_a, compound_b) {
  var groups_a = compound_a.groups;
  groups_a.sort();
  var groups_b = compound_b.groups;
  groups_b.sort();
  return groups_a == groups_b;
}

function groups_difference(groups_a, groups_b) {
  var difference = [];
  var max;
  var min;
  if (groups_a.length > groups_b.length) {
    max = groups_a;
    lesser = groups_b;
  }
  else {
    max = groups_b;
    lesser = groups_a;
  }
  var min_copy = min;
  for (var i=0;i<max.length;++i) {
    var g = max[i];
    if (!has_groups(min, g)) {
      difference.append(g);
      min_copy.remove(g);
    }
  }
  for (var i=0;i<min.length;++i) difference.append(min[i]);
  return difference;
}

function has_groups(compound, groups) {
  for (group in groups) {
    if (!group in compound) return false;
  }
  return true;
}

console.log("Compound info loaded!");