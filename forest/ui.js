export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Helvetica";
        this.heartImg = document.getElementById("heartImg");
    }
    draw(context) {
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText("Score: " + this.game.score, 20, 50);
        //timer
        context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
        let time = (this.game.time * 0.001).toFixed(1)
        if (time <= 0) time = 0.0;
        context.fillText("Time: " + time, 20, 80);
        //hearts
        for (let i = 0; i < this.game.hearts; i++) {
            context.drawImage(this.heartImg, 25 * i + 20, 95, 25, 25);
        }

        //game over
        if (this.game.gameOver) {
            context.textAlign = "center";
            context.font = `${this.fontSize * 2}px ${this.fontFamily}`;
            context.fillText("Game Over", this.game.width * 0.5, this.game.height * 0.5);
            
        }
    }
}