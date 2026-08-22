/// <reference types="p5/global" />

class Spaceship {
  constructor(x, y, m) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 20; 
    this.angle = 0;
    this.radius = 4; // Step size / radius for polar calculation
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  // turns the ship
  turn(amount) {
    this.angle += amount;
  }

  // when the button is pressed it applys a polar movement to increase speed
  thrust() {
    let x = this.radius * cos(this.angle);
    let y = this.radius * sin(this.angle);

    // Apply thrust directly in direction ship is facing
    this.position.x += x;
    this.position.y += y;
  }

  update() { // updates the ship
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(0);
    push(); // grabs snippet of the canvas and lets moving happen
    translate(this.position.x, this.position.y); // sets the origin to the coordinates
    rotate(this.angle); // Rotates triangle shape to match this.angle
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop(); // brings the snippet back so that nothing actually happens to the canvas
  }

  edges() { // if it hits an edge it stop, or can change values opp and get the thing to go back and forth in the walls
    if (this.position.x > width) {
      this.position.x = width;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.y > height){
      this.position.y = height;
    } 
    if (this.position.y < 0) {
      this.position.y = 0;
    }
  }
}

class Particle {
  constructor(x,y) {
    this.position =  createVector(x, y);
    //{!1} For demonstration purposes, the particle has a random velocity.
    this.velocity = createVector(random(-1, 1), random(0,2));
    this.acceleration = createVector(0, 0);
    this.lifespan = 150.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    fill(60, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  // Keep the same physics model as in previous chapters.
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Is the particle alive or dead?
  isDead() {
    return (this.lifespan < 0.0);
  }
}

class Emitter {
  constructor(x,y) {
    this.origin = createVector(x,y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  run() {
    let length = this.particles.length - 1;
    for (let i = length; i >= 0; i--) {
      let particle = this.particles[i];
      particle.update();
      particle.show();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

let ship;
let shipThruster;

function setup() {
  createCanvas(1440,600);
  ship = new Spaceship(width / 2, height / 2, 5); // ship spawns at middle and mass of 5
  shipThruster = new Emitter(ship.position.x,ship.position.y);
}

function draw() {
  background(255);
  
  if (keyIsDown(LEFT_ARROW)) {
    ship.turn(-0.05); // Rotates left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ship.turn(0.05);  // Rotates right
  }
  if (keyIsDown(UP_ARROW)) {  // Spacebar
    ship.thrust();
    shipThruster.addParticle();
  }

  ship.update();
  ship.edges();
  

  shipThruster.origin.set(ship.position.x,ship.position.y);

  shipThruster.run();
  ship.show();
  
}