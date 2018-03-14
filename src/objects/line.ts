import BitmapData = Phaser.BitmapData;
import Game = Phaser.Game;

export class Line {
    private bmd: Phaser.BitmapData;
    private sprite: Phaser.Sprite;


    constructor(private game: Game, width: number, height: number) {
        this.bmd = this.game.add.bitmapData(width, height);
        this.bmd.ctx.beginPath();
        this.bmd.ctx.lineWidth = 4;
        this.bmd.ctx.strokeStyle = 'white';
        this.bmd.ctx.stroke();
        this.sprite = this.game.add.sprite(0, 0, this.bmd);
    }

    drawLine(initX, initY, endX, endY) {
        this.bmd.clear();
        this.bmd.ctx.beginPath();
        this.bmd.ctx.moveTo(initX, initY);
        this.bmd.ctx.lineTo(endX , endY);
        this.bmd.ctx.lineWidth = 4;
        this.bmd.ctx.stroke();
        this.bmd.ctx.closePath();
        this.bmd.render();
    }

    removeLine() {
        this.bmd.clear();
    }
}