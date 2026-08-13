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