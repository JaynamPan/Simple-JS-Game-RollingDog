export class FloatingMsg {
    constructor(msg, x, y, targetX, targetY) {
        this.msg = msg;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markDelete = false;
        this.timer = 0;


    }
    update() {
        this.x += (this.targetX - this.x)*0.03;
        this.y += (this.targetY - this.y)*0.03;
        this.timer++;
        if (this.timer > 100) this.markDelete = true;
    }
    draw(context) {
        context.font = "20px Creepster";
        context.fillStyle = "white";
        context.fillText(this.msg, this.x, this.y);
    }
}