var file = document.getElementById("audio-file");
var audio = document.getElementById("audio");
var context;
var src;
var analyser;

file.onchange = function () {
  context = new AudioContext();
  src = context.createMediaElementSource(audio);
  analyser = context.createAnalyser();
  var files = this.files;
  audio.src = URL.createObjectURL(files[0]);
  audio.load();

  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = 300;
  var ctx = canvas.getContext("2d");

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = Number(document.getElementById("size-select").value);

  var bufferLength = analyser.frequencyBinCount;

  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 2.5;
  var barHeight;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      var r = barHeight + (30 * (i / bufferLength));
      var g = 700 * (i / bufferLength);
      var b = 130;

      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
      if (i == bufferLength - 1) {
        break;
      }
    }
  }
  audio.play();
  renderFrame();
};

function changeSize(e) {
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = 300;
  var ctx = canvas.getContext("2d");
  analyser.fftSize = Number(e.value);

  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength)
  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 2.5;
  var barHeight;
  var x = 0;
  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      var r = barHeight + (30 * (i / bufferLength));
      var g = 700 * (i / bufferLength);
      var b = 130;

      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
      if (i == bufferLength - 1) {
        break
      }
    }
  }
  renderFrame()
}

$('.alert').alert('close')