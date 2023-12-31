class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markDelete = false;
    }
    update(dTime) {
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        //frame
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += dTime;
        }
        //check if off screen
        if (this.x + this.width < 0) this.markDelete = true;
    }
    draw(context) {
        context.drawImage(this.image, this.width * this.frameX, 0, this.width,
            this.height, this.x, this.y, this.width, this.height);
    }
}
export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById("flyImg");
        this.angle = 0;
        this.speedAngle = Math.random() * 0.1 + 0.1;
    }
    update(dTime) {
        super.update(dTime);
        this.angle += this.speedAngle;
        this.y += Math.sin(this.angle);
    }
}
export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById("plantImg");
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
}
export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = document.getElementById("spider_bigImg");
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;


    }
    update(dTime) {
        super.update(dTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) {
            this.speedY *= -1;
        }
        if (this.y < -this.height) this.markDelete = true;
    }
    draw(context) {
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width * 0.5, 0);
        context.lineTo(this.x + this.width * 0.5, this.y+this.height*0.3);
        context.stroke();
    }
}