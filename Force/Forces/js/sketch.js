class Mover{
  constructor(x, y, mass){
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.mass = mass;
    this.position = createVector(x, y);
  }
  applyForce(force){
    let f = p5.Vector.div(force, this.mass);

    this.acceleration.add(f);
  }
  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  show(){
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, this.mass*16);
  }
  checkEdges(){
    if(this.position.x > width){
      this.position.x = width;
      this.velocity.x *= -1;
    }
    else if(this.position.x < 0){
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if(this.position.y > height){
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
}
  let moverA;
  let moverB;

  function setup() {
    createCanvas(640, 360);
    moverA = new Mover(100, 30, 10);
    moverB = new Mover(300, 30, 2);
  }

  function draw(){
    background(255);

    let gravity = createVector(0, .98);
    let wind = createVector(0.1, 0);

    moverA.applyForce(gravity);
    moverA.applyForce(wind);
    moverA.update();
    moverA.checkEdges();
    moverA.show();

    moverB.applyForce(gravity);
    moverB.applyForce(wind);
    moverB.update();
    moverB.checkEdges();
    moverB.show();
  }
