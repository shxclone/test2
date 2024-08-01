const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let painting = false;

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function startPosition(e) {
  painting = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  const pos = getMousePos(e);

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

// Adding event listeners for mouse and touch events
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', finishedPosition); // Stop drawing when mouse leaves the canvas
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', e => {
  e.preventDefault(); // Prevent scrolling when touching the canvas
  draw(e.touches[0]);
});

document.getElementById('clearBtn').addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('saveBtn').addEventListener('click', function() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'signature.png';
  link.href = dataURL;
  link.click();
});