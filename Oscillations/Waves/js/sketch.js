/// <reference types="p5/global" />

class Wave  {
  constructor(x,y,w,amplitude,period) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.amplitude = amplitude;
    this.period = period;

    this.phase = 0;
    this.spacing = 4;
  }

  update(speed) {
    this.phase += speed;
  }

  calcYValues() {
    let y_values = [];
    let angle = this.phase;

    let dx = (TWO_PI/this.period) * this.spacing;
    let objects = floor(this.width/this.spacing);

    for(let i = 0; i <= objects; i++){
      y_values.push(this.amplitude * sin(angle));
      angle += dx;
    }
    return y_values;
  }

  show() {
    let Yvalues = this.calcYValues();
    push();
    translate(this.x,this.y);
    noFill();
    stroke(0);
    strokeWeight(2);
    beginShape();
    for(let i = 0; i < Yvalues.length; i++){
      let pos_x = i * this.spacing;
      let pos_y = Yvalues[i];
      fill(100, 150, 255, 150);
      noStroke();
      circle(pos_x, pos_y, 8);
    }
    pop();
  }
}

let wave1;
let wave2;
let wave3;

function setup() {
  createCanvas(640, 360);
  // Wave(x, y, width, amplitude, period)
  wave1 = new Wave(0, 100, width, 50, 300);
  wave2 = new Wave(0, 100, width, 50, 200);
  wave3 = new Wave(0, 100, width, 50, 1);
}

function draw() {
  background(255);

  wave1.update(0.09);

  wave2.update(0.03);

  wave3.update(0.02);

  let yvalA = wave1.calcYValues();
  let yvalB = wave2.calcYValues();
  let yvalC = wave3.calcYValues();

  push();
  translate(0, height/2);
  noFill();
  stroke(180, 50, 50);
  strokeWeight(3);
  beginShape();
  for(let i = 0; i < yvalA.length; i++){
    let combY = yvalA[i] + yvalB[i] + yvalC[i];
    let x = i * wave1.spacing;
    vertex(x, combY);
  }
  endShape();
  pop();
  
}