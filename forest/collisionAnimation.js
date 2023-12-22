export default class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markDelete = false;
        this.image = document.getElementById("boomImg");
        this.frameTimer = 0;
        this.fps = 15;
        this.frameInterval = 1000 / this.fps;

    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }
    update(dTime) {
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX > this.maxFrame) {
                this.markDelete = true;
            } else {
                this.frameX++;
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += dTime;
        }
    }

}