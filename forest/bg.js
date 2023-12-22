class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}
export class Bg {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1Img = document.getElementById("layer1Img");
        this.layer2Img = document.getElementById("layer2Img");
        this.layer3Img = document.getElementById("layer3Img");
        this.layer4Img = document.getElementById("layer4Img");
        this.layer5Img = document.getElementById("layer5Img");

        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Img);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2Img);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3Img);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Img);
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Img);
        this.bgLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }
    update() {
        this.bgLayers.forEach(layer => {
            layer.update();
        });
    }
    draw(context) {
        this.bgLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}