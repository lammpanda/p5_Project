/// <reference types="p5/global" />

class Particle {
  constructor(x,y) {
    this.position =  createVector(x, y);
    //{!1} For demonstration purposes, the particle has a random velocity.
    this.velocity = createVector(random(-1, 1), random(0,2));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
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

let emitters = [];

function setup() {
  createCanvas(640, 240);
}

function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}

function draw() {
  background(200);
  // No emitters are removed, so a for...of loop can work here!
  for (let emitter of emitters) {
    emitter.run();
    emitter.addParticle();
  }
}