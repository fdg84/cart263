class Drop {
    constructor() {
        this.x = random(width);
        this.y = random(-500, -50);

        this.z = random(0, 20);
        this.length = map(this.z, 0, 20, 10, 20);
        this.yspeed = map(this.z, 0, 20, 4, 20);
    }

    fall() {
        this.y = this.y + yspeed;
        this.grav = map(this.z, 0, 20, 0, 0.2);
        this.yspeed = this.yspeed + this.grav;

        if (this.y > height) {
            this.y = random(-200, -100);
            this.yspeed = map(this.z, 0, 20, 4, 10);
        }
    }

    show() {
        this.thick = map(this.z, 0, 10, 1, 3);
        strokeWeight(5); //thick
        stroke(255);
        line(this.x, this.y, this.x, this.y + this.length);
    }
}