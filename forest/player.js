import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./playerStates.js";
import CollisionAnimation from "./collisionAnimation.js";
import { FloatingMsg } from "./floatingMsg.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById("playerImg");
        this.frameX = 0;
        this.frameY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 10;
        this.maxFrame = 6;
        this.frameTimer = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.weight = 1;
        this.states = [new Sitting(this.game), new Running(this.game),
        new Jumping(this.game), new Falling(this.game),
        new Rolling(this.game), new Diving(this.game),
        new Hit(this.game)];
        this.currentState = null;


    }
    update(dTime, input) {
        this.checkCollision();
        this.currentState.handleInput(input);
        //horizontal movement
        this.x += this.speedX;
        if (input.includes("ArrowRight") && this.currentState !== this.states[6]) this.speedX = this.maxSpeed;
        else if (input.includes("ArrowLeft") && this.currentState !== this.states[6]) this.speedX = -this.maxSpeed;
        else this.speedX = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement
        this.y += this.speedY;
        if (!this.onGround()) this.speedY += this.weight;
        else this.speedY = 0;
        if (this.y > this.game.height - this.height - this.game.groundMargin) {
            this.y = this.game.height - this.height - this.game.groundMargin;
        }

        //frame
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += dTime;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed) {
        // console.log(this.currentState);
        this.currentState = this.states[state];
        this.game.speed = speed * this.game.maxSpeed;
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(e => {
            if (e.x < this.x + this.width &&
                e.x + e.width > this.x &&
                e.y < this.y + this.height &&
                e.y + e.height > this.y) {
                //collision detected
                e.markDelete = true;
                this.game.collisions.push(new CollisionAnimation(this.game, e.x + e.width * 0.5,
                    e.y + e.height * 0.5));
                if (this.currentState === this.states[4] ||
                    this.currentState === this.states[5]) {
                    this.game.score++;
                    this.game.floatingMsgs.push(new FloatingMsg("+1", e.x, e.y, 150, 50));
                } else {
                    this.setState(6, 0);
                    this.game.hearts--;
                    if (this.game.hearts <= 0) this.game.gameOver = true;
                }

            }
        });
    }
}