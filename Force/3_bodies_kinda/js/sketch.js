class Body {
  constructor(x, y, m) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = m;
    this.radius = sqrt(this.mass) * 8;
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
    this.acceleration.mult(0); // Reset acceleration each frame
  }

  show() {
    stroke(0);
    fill(175, 200);
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}

let bodies = [];
let G = 1;

function setup() {
  createCanvas(640, 360);

  let m = 10;
  // Initialize your bodies array
  bodies.push(new Body(320, 100, m)); 
  bodies.push(new Body(225, 255, m)); // Shifted slightly left/down
  bodies.push(new Body(415, 245, m)); // Shifted slightly right/up

  // Give them initial tangential velocities for orbit
  bodies[0].velocity = createVector(1.2, 0);
  bodies[1].velocity = createVector(-0.6, -1.0);
  bodies[2].velocity = createVector(-0.6, 1.0);
}

function draw() {
  background(255, 30);

  // 1. Calculate mutual attraction between all bodies in the array
  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        // body[j] attracts body[i]
        let force = bodies[j].attract(bodies[i]);
        bodies[i].applyForce(force);
      }
    }
  }

  // 2. Update and display each body
  for (let body of bodies) {
    body.update();
    body.show();
  }
}