class Mover{
  constructor(){
    this.position = createVector(width/2, height/2);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0.001, 0.01);
    this.topspeed = 10;
  }
  update(){
      let mouse = createVector(mouseX, mouseY);

      let direction = p5.Vector.sub(mouse, this.position);

      direction.normalize();
      direction.mult(0.5);
      this.acceleration = direction;

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
  let can = createCanvas(1920, 1080);
  // can.style('border', '5px solid red');
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.show();
}