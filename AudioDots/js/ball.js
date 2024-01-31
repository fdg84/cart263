class Ball {

    // The Constructor() Sets Properties
    constructor(x, y, radius, row, col, sound) {
      // Position and Size Information
      this.x = x;
      this.y = y;
      this.radius = 20;
      this.clickRadius = radius;
      this.animate = false;
      this.maxRadius = 50 + Math.floor(Math.random() * 70);
      this.minRadius = 20;
      this.transformSpeed = 4
      this.row = row;
      this.col = col;
      this.isGrowing = false;
      this.isShrinking = false;
      console.log('my sound', sound)
      this.sound = sound;
    }
    
    // Displays on the Canvas
    display() {
       push();
        if (this.isGrowing){
            this.radius = this.radius + this.transformSpeed;   
        }

        if (this.isShrinking){
            this.radius = this.radius - this.transformSpeed;   
        }

        if(this.radius >= this.maxRadius && this.isGrowing){
            this.isGrowing = false
            this.isShrinking = true
            this.radius = this.maxRadius
        }

        if(this.radius <= this.minRadius && this.isShrinking){
            this.isGrowing = false
            this.isShrinking = false
            this.radius = this.minRadius
        }

        if(this.animate && this.sound.isPlaying()) {
            fill(171, 250, 0);
        } else {
            fill(59, 95, 114)
            this.animate = false;
        }
        
       strokeWeight(10);
       stroke(255); 
       ellipse(this.x, this.y, this.radius);
       pop();
    }
  }