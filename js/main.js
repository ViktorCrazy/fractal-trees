const canvas = document.querySelector("#canvas1");
const generateButton = document.querySelector(".generate-tree-button");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.shadowBlur = 15;
  ctx.shadowColor = "black"; //`rgba(255,255,255,.5)`;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  // ctx.lineTo(0, -len);
  if (angle > 0) {
    ctx.bezierCurveTo(20, -len / 2, 20, -len / 2, 0, -len);
  } else {
    ctx.bezierCurveTo(20, -len / 2, -20, -len / 2, 0, -len);
  }

  ctx.stroke();

  if (len < 10) {
    // leafs
    ctx.beginPath();
    ctx.arc(0, -len, 10, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  curve = Math.random() * 10 + 10;

  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6);
  drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.6);
  // drawTree(
  //   0,
  //   -len,
  //   len * 0.75,
  //   angle + Math.random() * curve,
  //   branchWidth * 0.6
  // );

  ctx.restore();
}

function generateRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let centerPoint = canvas.width / 2;
  let len = Math.floor(Math.random() * 20 + 100);
  let angle = 0;
  let branchWidth = Math.floor(Math.random() * 50) + 1;
  let color1 = `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;
  let color2 = `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;

  generateButton.style.background = color1;

  drawTree(
    centerPoint,
    canvas.height - 80,
    len,
    angle,
    branchWidth,
    color1,
    color2
  );
}

generateButton.addEventListener("click", () => {
  generateRandomTree();
});

generateRandomTree();
