/// <reference types="p5/global" />

class Mover {
  constructor(x, y, m) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = m;
    this.radius = sqrt(this.mass) * 8;
    this.angAcc = 0;
    this.angVel = 0;
    this.angle = 0;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  attract(other) {
    // Vector pointing from this body to the other body
    let force = p5.Vector.sub(this.position, other.position);
    let distance = force.mag();

    // Constrain distance to prevent extreme forces at tiny distances
    distance = constrain(distance, 5, 25);

    // Gravitational magnitude: F = (G * m1 * m2) / d^2
    let strength = (G * this.mass * other.mass) / (distance * distance);
    force.setMag(strength);

    return force;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angAcc = this.acceleration.x / 10.0;
    this.angVel += this.angAcc;

    this.angVel = constrain(this.angVel, -0.1, 0.1);
    this.angle += this.angVel;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    fill(175, 200);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    circle(0, 0, this.radius * 2);
    line(0, 0, this.radius, 0);
    pop();
  }
}

let bodies = [];
let G = 1;
let sun;

function setup() {
  createCanvas(1080, 640);

  // Changed Body -> Mover
  sun = new Mover(width / 2, height / 2, 100);

  for (let i = 0; i < 4; i++) {
    // Changed Body -> Mover
    let b = new Mover(random(width), random(height), random(0.1, 2));

    // Vector pointing from body to sun
    let v = p5.Vector.sub(sun.position, b.position);
    // Rotate 90 degrees to get a perpendicular tangential velocity
    v.rotate(HALF_PI);
    // Set a moderate starting speed
    v.setMag(random(0, 1));

    b.velocity = v;
    bodies.push(b);
  }
}

function draw() {
  background(255, 30);

  sun.show();

  for (let i = 0; i < bodies.length; i++) {
    // Added 'let' to sunForce
    let sunForce = sun.attract(bodies[i]);
    bodies[i].applyForce(sunForce);

    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        // body[j] attracts body[i]
        let force = bodies[j].attract(bodies[i]);
        bodies[i].applyForce(force);
      }
    }

    bodies[i].update();
    bodies[i].show();
  }
}