export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Helvetica";
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
        //game over
        if (this.game.gameOver) {
            context.save();
            context.fillStyle = "white";
            context.textAlign = "center";
            context.font = `${this.fontSize * 2}px ${this.fontFamily}`;
            context.fillText("Game Over", this.game.width * 0.5, this.game.height * 0.5);
            context.restore();
        }
    }
}