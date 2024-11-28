document.getElementById("generateButton").addEventListener("click", generateTrack);

function generateTrack() {
  // All 12 keys
  const majorKeys = [
    "C", "C#", "D♭", "D", "E♭", "E", "F", "F#", "G♭", "G", "A♭", "A", "B♭", "B"
  ]
  const minorKeys = [
    "Am", "A#m", "B♭m", "Bm", "Cm", "C#m", "Dm", "D#m", "E♭m", "Em", "Fm", "F#m", "Gm", "G#m"
  ]

  // Tempo options
  const tempos = [80, 100, 120, 140, 160];

  // Popular progressions with chord roles
  const progressions = {
    "I-IV-V": [1, 4, 5],
    "I-V-vi-IV": [1, 5, 6, 4],
    "ii-V-I": [2, 5, 1],
    "I-vi-ii-V": [1, 6, 2, 5],
    "I-IV-vi-V": [1, 4, 6, 5],
    "I-V-IV": [1, 5, 4],
  };

  // Generate random key, tempo, and progression
  let randomKey
  let minormaj = Math.floor(Math.random() * 2) + 1
  if (minormaj == 2) {
    randomKey = minorKeys[Math.floor(Math.random() * minorKeys.length)]
  } else {
    randomKey = majorKeys[Math.floor(Math.random() * majorKeys.length)]
  }
  const randomTempo = Math.floor(Math.random() * 80) + 80;
  const progressionName = Object.keys(progressions)[Math.floor(Math.random() * Object.keys(progressions).length)];
  const progression = progressions[progressionName];

  // Determine chords for the selected progression
  const chords = getChordsForProgression(randomKey, progression);

  // Update the UI
  document.getElementById("key").textContent = randomKey;
  document.getElementById("tempo").textContent = randomTempo;
  document.getElementById("progression").textContent = progressionName;
  document.getElementById("chords").textContent = chords.join(" - ");
}

// Helper function to get chords for a progression in a given key
function getChordsForProgression(key, progression) {
  // Major and minor scales
  const scales = {
    "C": "C Dm Em F G Am Bm♭5",
    "C#": "C# D#m E#m F# G# A#m B#m♭5",
    "D♭": "D♭ E♭m Fm G♭ A♭ B♭m Cm♭5",
    "D": "D Em F#m G A Bm C#m♭5",
    "E♭": "E♭ Fm Gm A♭ B♭ Cm Dm♭5",
    "E": "E F#m G#m A B C#m D#m♭5",
    "F": "F Gm Am B♭ C Dm Em♭5",
    "F#": "F# G#m A#m B C# D#m E#m♭5",
    "G♭": "G♭ A♭m B♭m C♭ D♭ E♭m Fm♭5",
    "G": "G Am Bm C D Em F#m♭5",
    "A♭": "A♭ B♭m Cm D♭ E♭m Fm Gm♭5",
    "A": "A Bm C#m D E F#m G#m♭5",
    "B♭": "B♭ Cm Dm E♭ F Gm Am♭5",
    "B": "B C#m D#m E F# G#m A#m♭5",
    "Am": "Am Bm♭5 C Dm Em F G",
    "A#m": "A#m B#m♭5 C# D#m E#m F# G#",
    "B♭m": "B♭m Cm♭5 D♭ E♭m Fm G♭ A♭",
    "Bm": "Bm C#m♭5 D Em F#m G A",
    "Cm": "Cm Dm♭5 E♭ Fm Gm A♭ B♭",
    "C#m": "C#m Dm♭5 E F#m G#m A B",
    "Dm": "Dm Em♭5 F Gm Am B♭ C",
    "D#m": "D#m E#m♭5 F# G#m A#m B C#",
    "E♭m": "E♭m Fm♭5 G♭ A♭m B♭m C♭ D♭",
    "Em": "Em F#m♭5 G Am Bm C D",
    "Fm": "Fm Gm♭5 A♭ B♭m Cm D♭ E♭m5",
    "F#m": "F#m G#m♭5 A Bm C#m D E",
    "Gm": "Gm Am♭5 B♭ Cm Dm E♭ F",
    "G#m": "G#m A#m♭5 B C# D# E F#"
  }

  // Rotate scale to match the key
  const scaleString = scales[key]
  const scale = scaleString.split(" ")
  let newChords = []
  for (let p of progression) {
    newChords.push(scale[p-1])
  }
  return newChords
//   const rotatedScale = [...scale.slice(rootIndex), ...scale.slice(0, rootIndex)];

//   // Map progression numbers to chords
//   return progression.map((degree) => rotatedScale[degree - 1]);
}
