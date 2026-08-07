let randomCounts = [];
let total = 20;

function setup() {
  createCanvas(800, 800);
  for(let i = 0; i < total; i++){
    randomCounts[i] = 0;
  }
}
function draw() {
  //{!1} A normal distribution with mean 320 and standard deviation 60
  let x = randomGaussian(320, 60);
  noStroke();
  fill(0, 10);
  circle(x, 120, 16);
}