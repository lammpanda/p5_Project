class Mover{

  constructor(x, y, mass){ // takes in 3 parameters, x and y position, and mass
    this.velocity = createVector(0,0); 
    this.acceleration = createVector(0,0);
    this.mass = mass;
    this.position = createVector(x, y);
    this.topspeed = 100;
    this.radius = this.mass * 8;
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
    circle(this.position.x, this.position.y, this.radius * 2); 
  }

  checkEdges(){ // check if the mover is outside the canvas
    if(this.position.x > width-this.radius){ // if the mover is outside then set position to 
      this.position.x = width-this.radius; //the edge and reverse the velocity right
      this.velocity.x *= -1;
    }
    else if(this.position.x < this.radius){ // same but for the left edge
      this.velocity.x *= -1;
      this.position.x = this.radius;
    }
    if(this.position.y > height-this.radius){ // same but for the bottom edge
      this.velocity.y *= -1;
      this.position.y = height-this.radius;
    }
    else if(this.position.y < this.radius){ // same but for the top edge
      this.velocity.y *= -1;
      this.position.y = this.radius;
    }
  }
}
class Liquid {
  constructor(x,y,w,h,c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  show(){
    noStroke();
    fill(175);
    rect(this.x, this.y, this.w, this.h);
  }
  contains(mover){
    let pos = mover.position;
    return(pos.x > this.x && pos.x < this.x + this.w && 
      pos.y > this.y && pos.y < this.y + this.h);
  }
  DragCalculate(mover){
  
  let speed = mover.velocity.mag();
  if(speed === 0) return createVector(0,0);
  // Calculate the force’s magnitude.
  let dragMagnitude = this.c * speed * speed;
  // Calculate the force’s direction.
  let dragForce = mover.velocity.copy();
  dragForce.mult(-1);
  // Finalize the force: set the magnitude and direction together.
  dragForce.setMag(dragMagnitude);
  // Return the force.
  return dragForce;
  }
}


let liquid;
let movers = []

function setup(){
  createCanvas(640, 360);
  for(let i = 0; i < 9; i++){
    let mass = random(1,3);
    movers[i] = new Mover(40+i*70,0,mass);
  }
  liquid = new Liquid(0, height/2, width, height/2, 0.1);
}

function draw(){
  background(255);

  liquid.show();
  for(let i = 0; i < movers.length; i++){
    if(liquid.contains(movers[i])){
      let dragForce = liquid.DragCalculate(movers[i]);
      movers[i].applyForce(dragForce);
    }
    let gravity = createVector(0,0.1*movers[i].mass);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].show();
    movers[i].checkEdges();
  }

}