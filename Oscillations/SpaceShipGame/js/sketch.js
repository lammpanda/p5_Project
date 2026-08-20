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
    fill(255, 100);
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

let ship;

function setup() {
  createCanvas(1440,600);
  ship = new Spaceship(width / 2, height / 2, 5); // ship spawns at middle and mass of 5
}

function draw() {
  background(60);
  
  if (keyIsDown(LEFT_ARROW)) {
    ship.turn(-0.05); // Rotates left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ship.turn(0.05);  // Rotates right
  }
  if (keyIsDown(UP_ARROW)) {  // Spacebar
    ship.thrust();
  }

  ship.update();
  ship.edges();
  ship.show();
}