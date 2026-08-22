/// <reference types="p5/global" />

let r1 = 125;
let r2 = 125;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;

let g = 1;

let px2 = -1;
let py2 = -1;
let cx,cy;
let buffer;



function setup(){
  createCanvas(1080,720);
  pixelDensity(1);
  a1 = PI/2;
  a2 = PI/2;
  cx = width/2;
  cy = height/2;
  buffer = createGraphics(width, height);
  buffer.background(250);
  buffer.translate(cx,cy);
}

function draw(){
  background(255);
  imageMode(CORNER);
  image(buffer,0,0,width,height);

  let subSteps = 100;
  let dt = 1.0 / subSteps;
  for (let step = 0; step < subSteps; step++) {
  let n1 = -g * (2 * m1 + m2) * sin(a1);
  let n2 = -m2 * g * sin(a1 - 2 * a2);
  let n3 = -2 * sin(a1 - a2) * m2;
  let n4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let d = r1 * (2 * m1 +m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (n1 + n2 + n3 * n4) / d;
  
  n1 = 2 * sin(a1 - a2);
  n2 = (a1_v * a1_v * r1 * (m1 + m2));
  n3 = g * (m1 + m2) * cos(a1);
  n4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  d = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (n1*(n2+n3+n4)) / d;

    a1_v += a1_a * dt;
    a2_v += a2_a * dt;
    a1 += a1_v * dt;
    a2 += a2_v * dt;
  }
  
  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  buffer.stroke(0, 100);
  buffer.strokeWeight(1);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }
  px2 = x2;
  py2 = y2;

  push();
  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, m1 * 2, m1 * 2);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, m2 * 2, m2 * 2);
  pop();

}