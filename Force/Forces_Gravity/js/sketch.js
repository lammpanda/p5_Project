class Mover {
  constructor(x, y, mass) {
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
    this.position = createVector(x, y);
    this.topspeed = 25; // Adjusted to a more practical speed limit
    this.radius = this.mass * 8;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass); // F = ma => a = F/m
    this.acceleration.add(f);
  }

  windForce() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(this.position, mouse);
    let distance = dir.mag();
    let maxDistance = 200;
    if (distance > 0 && distance < maxDistance) {
      dir.normalize();
      let strength = map(distance, 0, maxDistance, 2, 0);
      dir.mult(strength);
      return dir;
    }
    return createVector(0, 0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed); // Apply top speed limit
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration each frame
  }

  show() {
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, sqrt(this.mass) * 2);
  }

  checkEdges() {
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.radius) {
      this.velocity.x *= -1;
      this.position.x = this.radius;
    }
    if (this.position.y > height - this.radius) {
      this.velocity.y *= -1;
      this.position.y = height - this.radius;
    } else if (this.position.y < this.radius) {
      this.velocity.y *= -1;
      this.position.y = this.radius;
    }
  }

  CalcFriction() {
    if (this.ContactEdge()) {
      let c = 0.1;
      let normal = 1;
      let frictionMag = c * normal;

      let friction = this.velocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(frictionMag);

      this.applyForce(friction);
    }
  }

  ContactEdge() {
    return this.position.y > height - this.radius - 1;
  }

  BounceEdges() {
    let bounce = -0.9;
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= bounce;
    }
  }

  EdgeForce() {
    let maxdist = 100;
    let pushPower = 0.25;

    if (this.position.x > width - maxdist - this.radius) {
      let distance = width - this.position.x - this.radius;
      let push = map(distance, maxdist, 0, 0, pushPower);
      let repulsion = createVector(-push * this.mass, 0);
      this.applyForce(repulsion);

      if (this.velocity.x > 0) {
        let brake = createVector(-this.velocity.x * 0.15 * this.mass, 0);
        this.applyForce(brake);
      }
    }

    if (this.position.x < maxdist + this.radius) {
      let distance = this.position.x - this.radius;
      let push = map(distance, maxdist, 0, 0, pushPower);
      let repulsion = createVector(push * this.mass, 0);
      this.applyForce(repulsion);

      if (this.velocity.x < 0) {
        let brake = createVector(-this.velocity.x * 0.15 * this.mass, 0);
        this.applyForce(brake);
      }
    }
  }
}

class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.mass = 20;
  }

  show() {
    stroke(0);
    fill(175, 200);
    // FIXED: changed this.x, this.y to this.position.x, this.position.y
    circle(this.position.x, this.position.y, sqrt(this.mass) * 2);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25); // Avoid division by zero or infinite forces
    let strength = (G * this.mass * mover.mass) / (distance * distance);
    force.setMag(strength);
    return force;
  }
}

let mover;
let attractor;
let G = 1;

function setup() {
  createCanvas(640, 360);
  mover = new Mover(300, 100, 5);
  // Give mover initial velocity so it enters an orbit instead of falling straight into the center
  mover.velocity = createVector(1, 0); 
  attractor = new Attractor();
}

function draw() {
  background(255);

  let force = attractor.attract(mover);
  mover.applyForce(force);

  attractor.show();
  mover.update();
  mover.show();
}