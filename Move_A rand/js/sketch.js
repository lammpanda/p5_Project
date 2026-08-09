class Mover{
  constructor(){
    this.position = createVector(width/2, height/2);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(-0.001, 0.01);
    this.topspeed = 10;
  }
  update(){
      this.acceleration = p5.Vector.random2D();
      this.acceleration.mult(random(-1, 1));
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topspeed);
      this.position.add(this.velocity);
    }
  show(){
    stroke(0);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }
  checkEdges(){
    if(this.position.x > width){
      this.position.x = 0;
    }
    else if(this.position.x < 0){
      this.position.x = width;
    }
    if(this.position.y > height){
      this.position.y = 0;
    }
    else if(this.position.y < 0){
      this.position.y = height;
    }
  }
}

let mover;

function setup() {
  let can = createCanvas(640, 240);
  can.style('border', '5px solid red');
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.show();
}