//@TODO - refactor and split into utils where necessary

console.clear();

const grid = document.getElementById("grid");
const begin = document.getElementById('begin');
const delayControl = document.getElementById('delay');
const qControl = document.getElementById('q-factor');
const controls = document.getElementById('controls');

let soundButtons;

let currentIndex = 0;
let intervalId;

// initialise audio components
let audioCtxs = [];
let oscillators = [];
let bufferSources = [];
let gainNodes = [];
let panners = [];
// @TODO - even out this range
let dailyHours = [
  0.2,
  0.4,
  0.6000000000000001,
  0.8,
  1,
  1.2,
  1.4,
  1.5999999999999999,
  1.7999999999999998,
  1.9999999999999998,
  2.1999999999999997,
  2.4,
  2.6,
  2.8000000000000003,
  3.0000000000000004,
  3.2000000000000006,
  3.400000000000001,
  3.600000000000001,
  3.800000000000001,
  4.000000000000001,
  4.200000000000001,
  4.400000000000001,
  4.600000000000001,
  4.800000000000002,
  5.000000000000002,
  5.200000000000002,
  5.400000000000002,
  5.600000000000002,
  5.8000000000000025,
  6.000000000000003,
  6.200000000000003,
  6.400000000000003,
  6.600000000000003,
  6.800000000000003,
  7.0000000000000036,
  7.200000000000004,
  7.400000000000004,
  7.600000000000004,
  7.800000000000004,
  8.000000000000004,
  8.200000000000003,
  8.400000000000002,
  8.600000000000001,
  8.8,
  9,
  9.2,
  9.399999999999999,
  9.599999999999998,
  9.799999999999997,
  9.999999999999996,
  10.199999999999996,
  10.399999999999995,
  10.599999999999994,
  10.799999999999994,
  10.999999999999993,
  11.199999999999992,
  11.399999999999991,
  11.59999999999999,
  11.79999999999999,
  11.99999999999999,
  12.199999999999989,
  12.399999999999988,
  12.599999999999987,
  12.799999999999986,
  12.999999999999986,
  13.199999999999985,
  13.399999999999984,
  13.599999999999984,
  13.799999999999983,
  13.999999999999982,
  14.199999999999982,
  14.39999999999998,
  14.59999999999998,
  14.79999999999998,
  14.999999999999979,
  15.199999999999978,
  15.399999999999977,
  15.599999999999977,
  15.799999999999976,
  15.999999999999975,
  16.199999999999974,
  16.399999999999974,
  16.599999999999973,
  16.799999999999972,
  16.99999999999997,
  17.19999999999997,
  17.39999999999997,
  17.59999999999997,
  17.79999999999997,
  17.999999999999968,
  18.199999999999967,
  18.399999999999967,
  18.599999999999966,
  18.799999999999965,
  18.999999999999964,
  19.199999999999964,
  19.399999999999963,
  19.599999999999962,
  19.79999999999996,
  19.99999999999996,
  20.19999999999996,
  20.39999999999996,
  20.59999999999996,
  20.799999999999958,
  20.999999999999957,
  21.199999999999957,
  21.399999999999956,
  21.599999999999955,
  21.799999999999955,
  21.999999999999954,
  22.199999999999953,
  22.399999999999952,
  22.59999999999995,
  22.79999999999995,
  22.99999999999995,
  23.19999999999995,
  23.39999999999995,
  23.599999999999948,
  23.799999999999947,
  23.999999999999947,
  24.199999999999946,
  24.399999999999945,
  24.599999999999945,
  24.799999999999944,
  24.999999999999943,
  25.199999999999942,
  25.39999999999994,
  25.59999999999994,
  25.79999999999994,
  25.99999999999994,
  26.19999999999994,
  26.399999999999938,
  26.599999999999937,
  26.799999999999937,
  26.999999999999936,
  27.199999999999935,
  27.399999999999935,
  27.599999999999934,
  27.799999999999933,
  27.999999999999932,
  28.199999999999932,
  28.39999999999993,
  28.59999999999993,
  28.79999999999993,
  28.99999999999993,
  29.19999999999993,
  29.399999999999928,
  29.599999999999927,
  29.799999999999926,
  29.999999999999925,
  30.199999999999925,
  30.399999999999924,
  30.599999999999923,
  30.799999999999923,
  30.999999999999922,
  31.19999999999992,
  31.39999999999992,
  31.59999999999992,
  31.79999999999992,
  31.99999999999992,
  32.19999999999992,
  32.39999999999992,
  32.59999999999992,
  32.799999999999926,
  32.99999999999993,
  33.19999999999993,
  33.399999999999935,
  33.59999999999994,
  33.79999999999994,
  33.99999999999994,
  34.199999999999946,
  34.39999999999995,
  34.59999999999995,
  34.799999999999955,
  34.99999999999996,
  35.19999999999996,
  35.39999999999996,
  35.599999999999966,
  35.79999999999997,
  35.99999999999997,
  36.199999999999974,
  36.39999999999998,
  36.59999999999998,
  36.79999999999998,
  36.999999999999986,
  37.19999999999999,
  37.39999999999999,
  37.599999999999994,
  37.8,
  38,
  38.2,
  38.400000000000006,
  38.60000000000001,
  38.80000000000001,
  39.000000000000014,
  39.20000000000002,
  39.40000000000002,
  39.60000000000002,
  39.800000000000026,
  40.00000000000003,
  40.20000000000003,
  40.400000000000034,
  40.60000000000004,
  40.80000000000004,
  41.00000000000004,
  41.200000000000045,
  41.40000000000005,
  41.60000000000005,
  41.800000000000054,
  42.00000000000006,
  42.20000000000006,
  42.40000000000006,
  42.600000000000065,
  42.80000000000007,
  43.00000000000007,
  43.200000000000074,
  43.40000000000008,
  43.60000000000008,
  43.80000000000008,
  44.000000000000085,
  44.20000000000009,
  44.40000000000009,
  44.600000000000094,
  44.8000000000001,
  45.0000000000001,
  45.2000000000001,
  45.400000000000105,
  45.60000000000011,
  45.80000000000011,
  46.000000000000114,
  46.20000000000012,
  46.40000000000012,
  46.60000000000012,
  46.800000000000125,
  47.00000000000013,
  47.20000000000013,
  47.400000000000134,
  47.600000000000136,
  47.80000000000014,
  48.00000000000014,
  48.200000000000145,
  48.40000000000015,
  48.60000000000015,
  48.80000000000015,
  49.000000000000156,
  49.20000000000016,
  49.40000000000016,
  49.600000000000165,
  49.80000000000017,
  50.00000000000017,
  50.20000000000017,
  50.400000000000176,
  50.60000000000018,
  50.80000000000018,
  51.000000000000185,
  51.20000000000019,
  51.40000000000019,
  51.60000000000019,
  51.800000000000196,
  52.0000000000002,
  52.2000000000002,
  52.400000000000205,
  52.60000000000021,
  52.80000000000021,
  53.00000000000021,
  53.200000000000216,
  53.40000000000022,
  53.60000000000022,
  53.800000000000225,
  54.00000000000023,
  54.20000000000023,
  54.40000000000023,
  54.600000000000236,
  54.80000000000024,
  55.00000000000024,
  55.200000000000244,
  55.40000000000025,
  55.60000000000025,
  55.80000000000025,
  56.000000000000256,
  56.20000000000026,
  56.40000000000026,
  56.600000000000264,
  56.80000000000027,
  57.00000000000027,
  57.20000000000027,
  57.400000000000276,
  57.60000000000028,
  57.80000000000028,
  58.000000000000284,
  58.20000000000029,
  58.40000000000029,
  58.60000000000029,
  58.800000000000296,
  59.0000000000003,
  59.2000000000003,
  59.400000000000304,
  59.60000000000031,
  59.80000000000031,
  60.00000000000031,
  60.200000000000315,
  60.40000000000032,
  60.60000000000032,
  60.800000000000324,
  61.00000000000033,
  61.20000000000033,
  61.40000000000033,
  61.600000000000335,
  61.80000000000034,
  62.00000000000034,
  62.200000000000344,
  62.40000000000035,
  62.60000000000035,
  62.80000000000035,
  63.000000000000355,
  63.20000000000036,
  63.40000000000036,
  63.600000000000364,
  63.80000000000037,
  64.00000000000037,
  64.20000000000037,
  64.40000000000038,
  64.60000000000038,
  64.80000000000038,
  65.00000000000038,
  65.20000000000039,
  65.40000000000039,
  65.60000000000039,
  65.8000000000004,
  66.0000000000004,
  66.2000000000004,
  66.4000000000004,
  66.6000000000004,
  66.80000000000041,
  67.00000000000041,
  67.20000000000041,
  67.40000000000042,
  67.60000000000042,
  67.80000000000042,
  68.00000000000043,
  68.20000000000043,
  68.40000000000043,
  68.60000000000043,
  68.80000000000044,
  69.00000000000044,
  69.20000000000044,
  69.40000000000045,
  69.60000000000045,
  69.80000000000045,
  70.00000000000045,
  70.20000000000046,
  70.40000000000046,
  70.60000000000046,
  70.80000000000047,
  71.00000000000047,
  71.20000000000047,
  71.40000000000047,
  71.60000000000048,
  71.80000000000048,
  72.00000000000048,
  72.20000000000049,
  72.40000000000049,
  72.60000000000049,
  72.8000000000005,
  73.0000000000005
]
const blockLength = 7;
const intervalTime = 13000; 

// Triggered by 'begin' button (Gets around 'audio context must be created by user gesture')
function setup(){
  begin.addEventListener('click', () => {
    for (let i = 0; i < 4;i++) {
      audioCtxs[i] = new AudioContext();
    }
    buildGrid();
    begin.classList.add('not-visible');
    controls.style = 'display: flex;';
    soundButtons = document.querySelectorAll('.sound-btn');

    startStopwatch();
  });
}

// Build a grid
function buildGrid(){
  for (let i = 0; i < dailyHours.length; i++) {
    createSoundButtonElement(i);
    initWhiteNoiseBuffers(i);
  }
}

let imageIndex = 0;
let currentBlock;
const imagesFolder = 'images/';
const imageFileExtension = '.png';
let week = 1;

// @TODO - remove this
function toggleBlock() {
  
  soundButtons.forEach(button => {
    button.dataset.playing = "true";
    button.click();
  });

  currentBlock = [];

  for (let i = 1; i < blockLength + 1; i++) {
    const index = currentIndex + i;
    if (index < soundButtons.length) {
      soundButtons[index].dataset.playing = "false";
      soundButtons[index].click();
      currentBlock.push(index);
    }
  }

  currentIndex += blockLength;
  if (currentIndex >= soundButtons.length) {
    currentIndex = 0;
  }

  let container = document.getElementById('container');
  container.style = "opacity: 70%";

  week++
  let weekCounter = document.getElementById('weekcounter');
  weekCounter.innerText = `Week ${week}`;

  const frequencyFunction = Math.floor(Math.random() * 3)
  if(frequencyFunction === 0){
    playLows();
    setTimeout(() => {
      stopLows();
      container.style = "opacity: 100%";
    }, 500)
  } else if (frequencyFunction === 1) {
    playMids();
    setTimeout(() => {
      stopMids();
      container.style = "opacity: 100%";
    }, 500)
  } else {
    playHighs();
    setTimeout(() => {
      stopHighs();
      container.style = "opacity: 100%";
    }, 500)
  }

  // Update background image
  const body = document.body;
  body.style.backgroundImage = `url('${getCurrentImage()}')`;


  // Increment imagesIndex
  imageIndex++;
}

//@TODO - remove anything that handles images
function getCurrentImage() {
  return `${imagesFolder}week-${imageIndex + 1}${imageFileExtension}`;
}

//@TODO - more keyboard actions (take from tab)
// start all 
function startAll(){
  soundButtons.forEach((button) => {
    button.dataset.playing = false;
    button.click();
  })
}

// stop all 
function stopAll(){
  soundButtons.forEach((button) => {
    button.dataset.playing = true;
    button.click();
  })
}

// reverse selection 
function reverseSelection(){
  soundButtons.forEach((button) => {
    button.click();
  })
}

// Select by frequency range

// lows
function playLows(){
  soundButtons.forEach((button) => {
    buttonFreq = button.value;
    if(button.dataset.playing === 'false' && buttonFreq < 25){
      button.click();
    }
  })
}

function stopLows(){
  soundButtons.forEach((button) => {
    buttonFreq = button.value;
    const index = button.dataset.index;
    if(button.dataset.playing === 'true' && buttonFreq < 25 && !currentBlock.includes(parseInt(index))){
      button.click();
    }
  })
}

// mids
function playMids(){
  soundButtons.forEach((button) => {
    buttonFreq = button.value;
    if(button.dataset.playing === 'false' && buttonFreq >= 25 && buttonFreq < 51){
      button.click();
    }
  })
}

function stopMids(){
  soundButtons.forEach((button) => {
    buttonFreq = button.value;
    const index = button.dataset.index;
    if(button.dataset.playing === 'true' && buttonFreq >= 25 && buttonFreq < 51 && !currentBlock.includes(parseInt(index))){
      button.click();
    }
  })
}

// highs
function playHighs(){
  soundButtons.forEach((button) => {
    buttonFreq = button.value;
    if(button.dataset.playing === 'false' && buttonFreq >= 51){
      button.click();
    }
  })
}

function stopHighs(){
  soundButtons.forEach((button) => {
    buttonFreq = button.value;
    const index = button.dataset.index;
    if(button.dataset.playing === 'true' && buttonFreq >= 51 && !currentBlock.includes(parseInt(index))){
      button.click();
    }
  })
}

function playRandom(){
  let randomIndex = Math.floor(Math.random() * 365);
  soundButtons[randomIndex].click();
}

// Create white noise buffers with gain set to 0
function initWhiteNoiseBuffers(i) {
  let audioCtx = audioCtxs[i % 4];

  bufferSources[i] = audioCtx.createBufferSource();

  const bufferSize = 2 * audioCtx.sampleRate; 
  const bufferLeft = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const dataLeft = bufferLeft.getChannelData(0);

  const bufferRight = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const dataRight = bufferRight.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    dataLeft[i] = Math.random() * 2 - 1;
    dataRight[i] = Math.random() * 2 - 1;
  }

  const stereoBuffer = audioCtx.createBuffer(2, bufferSize, audioCtx.sampleRate);
  stereoBuffer.copyToChannel(dataLeft, 0);
  stereoBuffer.copyToChannel(dataRight, 1);

  bufferSources[i].buffer = stereoBuffer;

  gainNodes[i] = audioCtx.createGain();
  gainNodes[i].max = 2;
  gainNodes[i].gain.setValueAtTime(0, audioCtx.currentTime);

  const filterNode = audioCtx.createBiquadFilter();
  filterNode.type = 'bandpass';
  filterNode.frequency.value = dailyHours[i] * 50; 

  let qValue = 10000;
  filterNode.Q.value = qValue;
  qControl.addEventListener("change", (e) => {
    qValue = e.target.value;
    filterNode.Q.value = qValue;
  }) 

  panners[i] = audioCtx.createStereoPanner();
  panners[i].pan.value = 0;

  const delayNode = audioCtx.createDelay();
  let delayValue = 0;
  delayControl.addEventListener("change", (e) => {
    delayValue = e.target.value;
    delayNode.delayTime.linearRampToValueAtTime(delayValue, audioCtx.currentTime + 0.05);
  }
  )

  bufferSources[i].connect(gainNodes[i]).connect(filterNode).connect(delayNode).connect(panners[i]).connect(audioCtx.destination);

  bufferSources[i].loop = true;  
  bufferSources[i].start();
}


function createSoundButtonElement(i) {
  const section = document.createElement("section");
  section.className = "controls";

  const button = document.createElement("button");
  button.dataset.index = i;
  button.dataset.playing = "false";
  button.className = 'sound-btn';
  button.value = dailyHours[i];
  button.style.backgroundColor = `rgba(53, 94, 219, ${Math.floor(dailyHours[i]) / 100})`
  button.style.border = '1px solid white'

  // create rows
  const rowNumber = Math.floor(i / 73);
  let row = document.querySelector(`.row-${rowNumber}`);
  if (!row) {
    row = document.createElement("div");
    row.className = `row row-${rowNumber}`;
    grid.appendChild(row);
  }

  // populate rows
  row.appendChild(section);
  section.appendChild(button);

  // Stop and start button sound by toggling volume
  button.addEventListener("click", () => {
    if (button.dataset.playing === "false") {
      gainNodes[i].gain.setTargetAtTime(2, audioCtxs[1 % 4].currentTime + 0.05, 0.015);
      button.dataset.playing = "true";
      button.classList.add("playing");
      //button.style.backgroundImage = `url('${getCurrentImage()}')`
    } else if (button.dataset.playing === "true") {
      gainNodes[i].gain.setTargetAtTime(0, audioCtxs[1 % 4].currentTime + 0.05, 0.015);
      button.dataset.playing = "false";
      button.classList.remove("playing");
    }
  });
}

// Keyboard navigation
const numRows = 5;
const numCols = 73;
let focusedButtonIndex = 0;

function focusButton(index) {
  soundButtons[index].focus();
}

document.addEventListener('keydown', (e) => {
  const key = e.key;

  switch (key) {
      case 'r':
        reverseSelection();
        break;
      case 'a':
        startAll();
        break;
      case 's':
        stopAll();
        break;
      case 'l':
        playLows();
        break;
      case 'm':
        playMids();
        break;
      case 'h':
        playHighs();
        break;
      case 'w':
        playRandom();
        break;
      case 'd':
        delayControl.focus()
        break;
      case 'q':
        qControl.focus();
        break;
  }
});

document.addEventListener('keyup', (e) => {
  const key = e.key;

  switch (key){
    case 'l':
      stopLows();
      break;
    case 'm':
      stopMids();
      break;
    case 'h':
      stopHighs();
      break;
  }
})

// Stopwatch
const stopwatchDisplay = document.getElementById('stopwatch');
let stopwatchInterval;
let seconds = 0, minutes = 0, hours = 0;

function startStopwatch() {
  stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function updateStopwatch() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  stopwatchDisplay.textContent = 
    (hours < 10 ? '0' + hours : hours) + ':' + 
    (minutes < 10 ? '0' + minutes : minutes) + ':' + 
    (seconds < 10 ? '0' + seconds : seconds);
}

setup();