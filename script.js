const ball = document.querySelector(".ball")

let pos = {x:0, y:0}

function angleToVector(degrees) {
  // Convert degrees to radians
  const theta = (degrees * Math.PI) / 180;
  let x = Math.cos(theta);
  let y = Math.sin(theta);
  // const magnitude = Math.sqrt(x**2 + y**2);


  // Round values close to zero to zero
  const threshold = 1e-10;
  x = Math.abs(x) < threshold ? 0 : x;
  y = Math.abs(y) < threshold ? 0 : y;

  // const normalizedVector = { x:(x / magnitude), y:(y / magnitude) };
  const normalizedVector = { x: x, y: y };
  return normalizedVector;
}


function translate(vector, elementPos, element, speed=0.5, unit="vmin") {
  elementPos.x += vector.x * speed;
  elementPos.y += vector.y * speed;
  element.style.left = `${elementPos.x}${unit}`;
  element.style.bottom = `${elementPos.y}${unit}`;
}



document.addEventListener('keyup', (event) => {
  if (event.key === "ArrowRight") {
    angle += 90;
    if (angle >= 360) {
      angle -= 360;
    }
  }
});

let angle = 50;
pos = {x: 25, y: 25}
let wait = 0
function reflect(a, pos) {
  console.log(wait);
  if (wait > 0) { wait -= 1; return; }
  if (pos.y >= 70 || pos.y <= 0) {
    angle *= -1;
    wait = 10;
  } else if (pos.x >= 70 || pos.x <= 0) {
    angle = (angle + 180) * -1;
    wait = 10;
  }
}

setInterval(() => {
  reflect(angle, pos);
  // console.log(angle)
  translate(angleToVector(angle), pos, ball, speed=0.2);
  angle = angle % 360;
}, 5);

ball.addEventListener('mouseover', () => {
  angle += 180;
});
