import InputHandler from "./input.js";
import Player from "./player.js";
import { Bg } from "./bg.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./ui.js";

window.addEventListener("load", function () {
    const canvas = this.document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.bg = new Bg(this);
            this.player = new Player(this);
            this.input = new InputHandler();
            this.ui = new UI(this);
            this.speed = 0;
            this.maxSpeed = 4;
            this.enemies = [];
            this.particles = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.score = 0;
            this.fontColor = "black";
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.maxParticles = 80;
            this.collisions = [];
            this.time = 60000;
            this.gameOver = false;
            this.hearts = 5;
            this.floatingMsgs = [];

        }
        update(dTime) {
            this.time -= dTime;
            if (this.time <= 0) {
                this.gameOver = true;

            }
            this.bg.update();
            this.player.update(dTime, this.input.keys);

            //handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += dTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(dTime);

            });
            this.enemies = this.enemies.filter(e => !e.markDelete);
            //handle messages
            this.floatingMsgs.forEach(msg => {
                msg.update();

            });
            this.floatingMsgs = this.floatingMsgs.filter(msg => !msg.markDelete);
            //handle particles
            this.particles.forEach((p, index) => {
                p.update();

            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            this.particles = this.particles.filter(p => !p.markDelete);
            //handle collision
            this.collisions.forEach((c, index) => {
                c.update(dTime);
            });
            this.collisions = this.collisions.filter(c => !c.markDelete);
          

        }
        draw(context) {
            this.bg.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(p => {
                p.draw(context);
            });
            this.collisions.forEach(c => {
                c.draw(context);
            });
            this.floatingMsgs.forEach(msg => {
                msg.draw(context);

            });
            this.ui.draw(context);
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new GroundEnemy(this));
            } else if (this.speed > 0) {
                this.enemies.push(new ClimbingEnemy(this));
            }
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);


});