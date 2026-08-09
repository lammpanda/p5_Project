let position_c;
let velocity_c;
let position_e;
let velocity_e;

function setup() {
  createCanvas(640, 240);
  position_c = createVector(100,100);
  velocity_c = createVector(2.5, 2);
  position_e = createVector(35, 35);
  velocity_e = createVector(2.0, 2.5);
}

function draw() {
  background(255);

  position_c.add(velocity_c);
  position_e.add(velocity_e);
  if(position_c.x > width || position_c.x < 0){
    velocity_c.x = velocity_c.x * -1;
  }
  if(position_c.y > height || position_c.y < 0){
    velocity_c.y = velocity_c.y * -1;
  }
  if(position_e.x > width || position_e.x < 0){
    velocity_e.x = velocity_e.x * -1;
  }
  if(position_e.y > height || position_e.y < 0){
    velocity_e.y = velocity_e.y * -1;
  }

  stroke(0);
  fill(127);
  circle(position_c.x, position_c.y, 48);
  ellipse(position_e.x, position_e.y, 20, 40);
}
