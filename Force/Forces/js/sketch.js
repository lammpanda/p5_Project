class Mover{
  constructor(x, y, mass){ // takes in 3 parameters, x and y position, and mass
    this.velocity = createVector(0,0); 
    this.acceleration = createVector(0,0);
    this.mass = mass;
    this.position = createVector(x, y);
    this.topspeed = 100;
  }
  applyForce(force){
    let f = p5.Vector.div(force, this.mass); // F = Ma => a = F/m

    this.acceleration.add(f); // add a to acceleration
  }
  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // reset acceleration to 0 each frame
    //this.velocity.x *= .98; // slight air resistance, prevents oscillations
  }
  show(){ // display the mover
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, this.mass*16); 
  }
  checkEdges(){ // check if the mover is outside the canvas
    if(this.position.x > width){ // if the mover is outside then set position to 
      this.position.x = width; //the edge and reverse the velocity right
      this.velocity.x *= -1;
    }
    else if(this.position.x < 0){ // same but for the left edge
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if(this.position.y > height){ // same but for the top edge
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
  EdgeForce(){
    let maxdist = 100;
    let pushPower = 0.25; // Controls strength of the return push

    if (this.position.x > width - maxdist) { // RIGHT WALL
      let distance = width - this.position.x;
      
      // Ramp from 0 (at 100px away) up to pushPower (at 0px away)
      // map(value, startMin, startMax, endMin, endMax)
      let push = map(distance, maxdist, 0, 0, pushPower);
      
      // smooth repulsive force pushing LEFT, proportional to mass
      let repulsion = createVector(-push * this.mass, 0);
      this.applyForce(repulsion);

      // Extra damping ONLY while moving TOWARD the wall
      if (this.velocity.x > 0) {
        let brake = createVector(-this.velocity.x * 0.15 * this.mass, 0);
        this.applyForce(brake);
      }
    }

    if (this.position.x < maxdist) { // LEFT WALL
      let push = map(this.position.x, maxdist, 0, 0, pushPower);
      
      // Smooth repulsive force pushing RIGHT
      let repulsion = createVector(push * this.mass, 0);
      this.applyForce(repulsion);

      // Extra damping ONLY while moving TOWARD the wall
      if (this.velocity.x < 0) {
        let brake = createVector(-this.velocity.x * 0.15 * this.mass, 0);
        this.applyForce(brake);
      }
    }
  }
}

  let moverA;
  let moverB;
  let MAX_DIST = 100; // Distance from the edge where repulsion starts

  function setup() {
    createCanvas(640, 360);
    moverA = new Mover(100, 30, 10);
    moverB = new Mover(300, 30, 2);
  }

  function draw(){
    background(255);
    drawCanvasGuides();

    let gravity = createVector(0, .98);
    
    if(mouseIsPressed){
      let wind = createVector(1, 0);
      moverA.applyForce(wind);
      moverB.applyForce(wind);
    }

    moverA.applyForce(gravity);
    
    moverA.EdgeForce();
    moverA.update();
    moverA.checkEdges();
    moverA.show();

    moverB.applyForce(gravity);
    moverB.EdgeForce();
    moverB.update();
    moverB.checkEdges();
    moverB.show();
  }

  function drawCanvasGuides() {

  noStroke();

  // 1. Highlight Repulsive Zones 
  fill(255, 200, 200, 80);
  rect(0, 0, MAX_DIST, height); // Left force zone
  rect(width - MAX_DIST, 0, MAX_DIST, height); // Right force zone

  // 2. Dashed Lines at 100px Threshold Boundaries
  stroke(220, 50, 50);
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 6]); // Set dashed pattern

  line(MAX_DIST, 0, MAX_DIST, height); // Left boundary  
  line(width - MAX_DIST, 0, width - MAX_DIST, height); // Right boundary  

  // Reset line dash so it doesn't affect other drawings
  drawingContext.setLineDash([]);

  // 3. Canvas Outer Border 
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(0, 0, width, height);
}