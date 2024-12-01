document.getElementById("generateButton").addEventListener("click", generateTrack);
const playSoundBtn = document.querySelector(".play-btn")

playSoundBtn.addEventListener("click", playTrack)

function pauseOrPlay() {
    if (chordPlayback.paused) {
        chordPlayback.play()
        playSoundBtn.innerText = "Pause"
    } else {
        chordPlayback.pause()
        playSoundBtn.innerText = "Play"
    }
}

let chordPlayback = document.querySelector(".playback-chords")

let generatedChords = []
let bpm = 60
function generateTrack() {
  // All 12 keys
  const majorKeys = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
  ]
  const minorKeys = [
    "Am", "B♭m", "Bm", "Cm", "C#m", "Dm", "E♭m", "Em", "Fm", "F#m", "Gm", "G#m"
  ]

  // Popular progressions with chord roles
  const progressions = {
    "I-IV-V": [1, 4, 5],
    "I-V-vi-IV": [1, 5, 6, 4],
    "ii-V-I": [2, 5, 1],
    "I-vi-ii-V": [1, 6, 2, 5],
    "I-IV-vi-V": [1, 4, 6, 5],
    "I-V-IV": [1, 5, 4],
    "I-IV-V-IV": [1, 4, 5, 4],
    "12 Bar Blues: (I-I-I-I IV-IV-I-I V-IV-I-I)": [1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 1],
    "I-vi-IV-V": [1, 6, 4, 5],
    "Canon: (I-V-vi-iii IV-I-IV-V)": [1, 5, 6, 3, 4, 1, 4, 5],
    "vi-ii-V-I": [6, 2, 5, 1],
    "8 Bar Blues: (I-V-IV-IV I-V-I-V)": [1, 5, 4, 4, 1, 5, 1, 5],
    "I-IV-I-V-IV-I": [1, 4, 1, 5, 4, 1],
    "I-V-IV-I": [1, 5, 4, 1]
  }

  // Generate random key, tempo, and progression
  let randomKey
  let minormaj = Math.floor(Math.random() * 2) + 1
  if (minormaj == 2) {
    randomKey = minorKeys[Math.floor(Math.random() * minorKeys.length)]
  } else {
    randomKey = majorKeys[Math.floor(Math.random() * majorKeys.length)]
  }
  const randomTempo = Math.floor(Math.random() * 80) + 70;
  const progressionName = Object.keys(progressions)[Math.floor(Math.random() * Object.keys(progressions).length)];
  const progression = progressions[progressionName];

  // Determine chords for the selected progression
  const chords = getChordsForProgression(randomKey, progression);

  generatedChords = chords
  bpm = randomTempo

  // Update the UI
  document.getElementById("key").innerText = randomKey;
  document.getElementById("tempo").innerText = randomTempo;
  document.getElementById("progression").innerText = progressionName;
  document.getElementById("chords").innerText = chords.join(" - ");

  playSoundBtn.style.display = "block"


  if (mediaRecorder && mediaRecorder.state === "recording") {
    breakRecording = true
    mediaRecorder.stop()
  }
  chordPlayback.src = ""
  playSoundBtn.innerText = "Record Chords"
  playSoundBtn.disabled = false
}

let breakRecording = false

// Helper function to get chords for a progression in a given key
function getChordsForProgression(key, progression) {
  // Major and minor scales
  const scales = {
    "C": "C Dm Em F G Am Bdim",
    "C#": "C# E♭m Fm F# G# B♭m B#dim",
    "D": "D Em F#m G A Bm C#dim",
    "D#": "D# Fm Gm G# A# Cm Ddim",
    "E": "E F#m G#m A B C#m D#dim",
    "F": "F Gm Am A# C Dm Edim",
    "F#": "F# G#m B♭m B C# E♭m Fdim",
    "G": "G Am Bm C D Em F#dim",
    "G#": "G# B♭m Cm C# D# Fm Gdim",
    "A": "A Bm C#m D E F#m G#dim",
    "A#": "A# Cm Dm D# F Gm Adim",
    "B": "B C#m E♭m E F# G#m A#dim",
    "Am": "Am Bdim C Dm Em F G",
    "B♭m": "B♭m Cdim C# E♭m Fm F# G#",
    "Bm": "Bm C#dim D Em F#m G A",
    "Cm": "Cm Ddim D# Fm Gm G# A#",
    "C#m": "C#m Ddim E F#m G#m A B",
    "Dm": "Dm Edim F Gm Am A# C",
    "E♭m": "E♭m Fdim F# G#m B♭m B C#",
    "Em": "Em F#dim G Am Bm C D",
    "Fm": "Fm Gdim G# B♭m Cm C# D#",
    "F#m": "F#m G#dim A Bm C#m D E",
    "Gm": "Gm Adim A# Cm Dm D# F",
    "G#m": "G#m A#dim B C#m E♭m E F#"
  }

  // Rotate scale to match the key
  const scaleString = scales[key]
  const scale = scaleString.split(" ")
  let newChords = []
  for (let p of progression) {
    newChords.push(scale[p-1])
  }
  return newChords
}

function getFrequencies(chords) {
    let f = []

    const frequencies = {
        // Major chords (Octave 4)
        "C": [261.63, 329.63, 392.00], // C, E, G
        "C#": [277.18, 349.23, 415.30], // C#, F, G#
        "D": [293.66, 369.99, 440.00], // D, F#, A
        "D#": [311.13, 392.00, 466.16], // D#, G, A#
        "E": [329.63, 415.30, 493.88], // E, G#, B
        "F": [349.23, 440.00, 523.25], // F, A, C
        "F#": [369.99, 466.16, 554.37], // F#, A#, C#
        "G": [392.00, 493.88, 587.33], // G, B, D
        "G#": [415.30, 523.25, 622.25], // G#, C, D#
        "A": [440.00, 554.37, 659.26], // A, C#, E
        "A#": [466.16, 587.33, 698.46], // A#, D, F
        "B": [493.88, 622.25, 739.99], // B, D#, F#

        // Minor chords (Octave 4)
        "Am": [440.00, 523.25, 659.26], // A, C, E
        "B♭m": [466.16, 554.37, 698.46], // B♭, D♭, F
        "Bm": [493.88, 587.33, 739.99], // B, D, F#
        "Cm": [261.63, 311.13, 392.00], // C, E♭, G
        "C#m": [277.18, 329.63, 415.30], // C#, E, G#
        "Dm": [293.66, 349.23, 440.00], // D, F, A
        "E♭m": [311.13, 369.99, 466.16], // E♭, G♭, B♭
        "Em": [329.63, 392.00, 493.88], // E, G, B
        "Fm": [349.23, 415.30, 523.25], // F, A♭, C
        "F#m": [369.99, 440.00, 554.37], // F#, A, C#
        "Gm": [392.00, 466.16, 587.33], // G, B♭, D
        "G#m": [415.30, 493.88, 622.25], // G#, B, D#

        // Diminished chords (Octave 4)
        "Cdim": [261.63, 311.13, 415.30], // C, E♭, G♭
        "C#dim": [277.18, 329.63, 392.00], // C#, E, G
        "Ddim": [293.66, 349.23, 415.30], // D, F, G
        "D#dim": [311.13, 369.99, 440.00], // D#, F#, A
        "Edim": [329.63, 392.00, 466.16], // E, G, A♭
        "Fdim": [349.23, 415.30, 493.88], // F, G#, A
        "F#dim": [369.99, 440.00, 523.25], // F#, A, B
        "Gdim": [392.00, 466.16, 554.37], // G, A♯, B
        "G#dim": [415.30, 493.88, 293.66], // G#, B, C
        "Adim": [440.00, 523.25, 554.37], // A, C, D
        "A#dim": [466.16, 554.37, 329.63], // A#, C#, D#
        "Bdim": [493.88, 293.66, 349.23], // B, D, F
        "B#dim": [523.25, 622.25, 739.99] // B#, D#, F#
    }

    for (let c of chords) {
        f.push(frequencies[c])
    }

    return f
}

let nowRecorder = null;
let mediaRecorder = null;
let audioContext = null;
let recordingTimeout = null; // Track the recording timeout

function playTrack() {
    // Stop and cleanup previous recording
    if (mediaRecorder !== null && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
    }

    if (audioContext) {
        audioContext.close(); // Close the previous audio context
        audioContext = null;
    }

    // Clear any existing timeout to avoid conflicts
    if (recordingTimeout) {
        clearTimeout(recordingTimeout);
        recordingTimeout = null;
    }

    // Reset audio source and UI
    chordPlayback.src = "";
    playSoundBtn.innerText = "Record Chords";
    playSoundBtn.disabled = false;

    let currentTime = 0;
    const addMeasures = [];

    // Expand the chords into measures
    for (let c of generatedChords) {
        for (let i = 0; i < 4; i++) {
            addMeasures.push(c);
        }
    }

    const freq = getFrequencies(addMeasures);
    const duration = 60 / bpm;

    // Create a new audio context
    audioContext = new AudioContext();

    // Create a MediaStreamDestination to capture audio
    const destination = audioContext.createMediaStreamDestination();

    // Initialize the MediaRecorder
    mediaRecorder = new MediaRecorder(destination.stream);
    const recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
        recordedChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        // Create a Blob from the recorded chunks
        const blob = new Blob(recordedChunks, {type : "audio/webm"})
        const audioUrl = URL.createObjectURL(blob);

        // Set the recorded audio to the audio tag
        chordPlayback.src = audioUrl;
        chordPlayback.play();

        // Reset UI
        playSoundBtn.innerText = "Record Chords";
        playSoundBtn.disabled = false;

        if (breakRecording) {
            chordPlayback.src = ""
            playSoundBtn.disabled = false
            breakRecording = false
        }
    };

    // Start recording
    mediaRecorder.start();
    playSoundBtn.innerText = "Recording Chords...";
    playSoundBtn.disabled = true;

    // Play the chords and record them
    freq.forEach((chord) => {
        const direction = Math.random() > 0.5 ? "up" : "down";
        currentTime = playChord(chord, direction, duration, currentTime, audioContext, destination);
    });

    // Stop recording after the track finishes
    recordingTimeout = setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
    }, currentTime * 1000);
}

function playChord(frequencies, direction, duration, startTime = 0, audioContext, destination) {
    const randomStrumDelay = 0.05;
    if (direction === "up") {
        frequencies.reverse();
    }

    frequencies.forEach((frequency, index) => {
        const noteStartTime = startTime + index * randomStrumDelay;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = "triangle"; // String-like sound
        oscillator.frequency.value = frequency;

        // Configure gain for dynamic strumming effect
        gainNode.gain.setValueAtTime(0.5, noteStartTime);
        gainNode.gain.linearRampToValueAtTime(0, noteStartTime + duration); // Release

        oscillator.connect(gainNode);
        gainNode.connect(destination);

        oscillator.start(noteStartTime);
        oscillator.stop(noteStartTime + duration);
    });

    return startTime + frequencies.length * randomStrumDelay + duration;
}
