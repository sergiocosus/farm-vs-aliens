import * as Assets from '../assets';
import Game = Phaser.Game;
import {ChickenStates} from './chicken-states';
import {Audio} from '../assets';
import AudioChickenThrow = Audio.AudioChickenThrow;

export class Chicken extends Phaser.Sprite {

     initX: number;
     initY: number;

    state = ChickenStates.STOPED;
    private chickenThrowSound: Phaser.Sound;

    constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
        super(game, x, y, key ? key : Assets.Spritesheets.SpritesheetsChicken10010013.getName(), frame);
    }

    initChicken() {
        this.game.physics.arcade.enable(this);
        this.inputEnabled = true;
        this.input.enableDrag();
        this.body.gravity.set(0, 0);
        this.events.onDragStart.add(this.onDragStart.bind(this));
        this.events.onDragStop.add(this.onDragStop.bind(this));
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.onOutOfBounds.bind(this));
        this.animations.add('walk');
        this.animations.play('walk', 30, true);
        this.width = 50;
        this.height = 50;

        this.chickenThrowSound = this.game.add.audio(AudioChickenThrow.getName());
        this.anchor.set(.5, .5);
    }

    private onDragStart() {
        this.initX = this.x;
        this.initY = this.y;
    }

    private onOutOfBounds() {
        if (this.y > this.game.height - 100 || this.x > 790 || this.x < 10 ) {
            this.x = this.game.world.centerX;
            this.y = this.game.world.height * .75;
            this.body.velocity.set(0, 0);
            this.body.gravity.set(0, 0);
            this.state = ChickenStates.STOPED;
            this.angle = 0;
        }
    }

    private onDragStop() {
        this.body.gravity.set(0, 1000);

        this.body.velocity.x = (this.initX - this.x) * 10;
        this.body.velocity.y = (this.initY - this.y) * 10;
        this.state = ChickenStates.FLYING;
        this.chickenThrowSound.play();


    }

    private onDragUpdate() {

    }


    update(): void {
        super.update();

        switch (this.state) {
            case ChickenStates.FLYING:
                this.angle += this.body.velocity.y / 30;
        }
    }
}

