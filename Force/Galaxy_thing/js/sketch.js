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
let G = 10;
let sun;

function setup() {
  createCanvas(1080, 640);

  sun = new Body(width/2,height/2,500)
  for (let i = 0; i < 67; i++) {
    let b = new Body(random(width), random(height), random(0.1, 2));
    
    // Vector pointing from body to sun
    let v = p5.Vector.sub(sun.position, b.position);
    // Rotate 90 degrees to get a perpendicular tangential velocity
    v.rotate(HALF_PI);
    // Set a moderate starting speed
    v.setMag(random(0,1));
    
    b.velocity = v;
    bodies.push(b);
  }
}

function draw() {
  background(255, 30);

  // 1. Calculate mutual attraction between all bodies in the array
  sun.show();
  for (let i = 0; i < bodies.length; i++) {
    sunForce = sun.attract(bodies[i]);
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