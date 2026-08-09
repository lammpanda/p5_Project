let position_b;
let velocity_b;
let size_b;

let position_c;
let velocity_c;
let position_e;
let velocity_e;

function setup() {
  createCanvas(640, 240);

  position_b = createVector(200, 50);
  velocity_b = createVector(1.5, 1);
  size_b = createVector(300, 150);

  position_c = createVector(100,100);
  velocity_c = createVector(2.5, 2);
  position_e = createVector(35, 35);
  velocity_e = createVector(2.0, 2.5);
}

function draw() {
  background(255);

  position_b.add(velocity_b);

  if(position_b.x > width - size_b.x || position_b.x < 0){
    velocity_b.x = velocity_b.x * -1;
  }
  if(position_b.y > height - size_b.y || position_b.y < 0){
    velocity_b.y = velocity_b.y * -1;
  }
  position_c.add(velocity_c);
  position_e.add(velocity_e);
  if(position_c.x > size_b.x - 24 || position_c.x < 24){
    velocity_c.x = velocity_c.x * -1;
  }
  if(position_c.y > size_b.y - 24 || position_c.y < 24){
    velocity_c.y = velocity_c.y * -1;
  }
  if(position_e.x > size_b.x - 20 || position_e.x < 20){
    velocity_e.x = velocity_e.x * -1;
  }
  if(position_e.y > size_b.y - 40 || position_e.y < 40){
    velocity_e.y = velocity_e.y * -1;
  }

  stroke(0);
  noFill();
  rect(position_b.x, position_b.y, size_b.x, size_b.y);

  push();
  translate(position_b.x, position_b.y);
  fill(127);
  circle(position_c.x, position_c.y, 48);
  ellipse(position_e.x, position_e.y, 20, 40);
  pop();
}
