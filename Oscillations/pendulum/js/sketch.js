/// <reference types="p5/global" />

class Pendulum  {
  constructor(x,y,r) {
    this.r = r;
    this.angle = PI / 4;
    this.angvel = 0;
    this.angacc = 0;
    this.pivot = createVector(x,y);
    this.bob = createVector(0,0);
    this.bobR = 24;
    this.dampening = 0.998;
  }

  update() {
    let gravity = 0.4;

    this.angacc = ((-1 * gravity ) / this.r) * sin(this.angle);
    this.angvel += this.angacc;
    this.angle += this.angvel;
    this.angvel *= this.dampening;

  }

  show() {
    this.bob.set(this.r* sin(this.angle), this.r * cos(this.angle));
    this.bob.add(this.pivot);

    stroke(0);
    line(this.pivot.x, this.pivot.y, this.bob.x, this.bob.y);

    fill(127);
    circle(this.bob.x, this.bob.y, this.bobR * 2);
  }
}

let pendulum; 

function setup() {
  createCanvas(640, 360);
  pendulum = new Pendulum(width/2,0, 125);
}

function draw() {
  background(255);

  pendulum.update();
  pendulum.show();
}