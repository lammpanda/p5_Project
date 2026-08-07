let circle_x = 100;
let circle_y = 100;
let ellipse_x = 35;
let ellipse_y = 35;

let circle_xspeed = 2.5;
let circle_yspeed = 2;
let ellipse_xspeed = 2.0;
let ellipse_yspeed = 2.5;

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  // Update positions separately
  circle_x = circle_x + circle_xspeed;
  circle_y = circle_y + circle_yspeed;
  ellipse_x = ellipse_x + ellipse_xspeed;
  ellipse_y = ellipse_y + ellipse_yspeed;

  // Circle bounces
  if (circle_x > width || circle_x < 0) {
    circle_xspeed = circle_xspeed * -1;
  }
  if (circle_y > height || circle_y < 0) {
    circle_yspeed = circle_yspeed * -1;
  }

  // Ellipse bounces
  if (ellipse_x > width || ellipse_x < 0) {
    ellipse_xspeed = ellipse_xspeed * -1;
  }
  if (ellipse_y > height || ellipse_y < 0) {
    ellipse_yspeed = ellipse_yspeed * -1;
  }

  stroke(0);
  fill(127);
  circle(circle_x, circle_y, 48);
  ellipse(ellipse_x, ellipse_y, 20, 40);
}
