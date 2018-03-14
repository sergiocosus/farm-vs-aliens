import * as Assets from '../assets';
import {Audio} from '../assets';
import AudioExplotion = Audio.AudioExplotion;
import {AlienState} from './alien-state';

export class Alien extends Phaser.Sprite {
     enabled = true;
     counter = 0;
     baseX;
     state = AlienState.FLYING;
    private explotion: Phaser.Sound;
    private static sin = Phaser.Math.sinCosGenerator(2000, 200, 200, 6);
    private defeatedTick: number;

    constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
        super(game, x, y, key ? key : Assets.Spritesheets.SpritesheetsAlien10010018.getName(), frame);
        this.baseX = x;
        this.initAlien();
        this.events.onKilled.add(this.onKilled.bind(this));
        this.explotion = this.game.add.audio(AudioExplotion.getName());

    }

    initAlien() {
        this.game.physics.arcade.enable(this);
        this.inputEnabled = true;
        this.body.velocity.set(0, 50);

        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.onOutOfBounds.bind(this));
        this.animations.add('walk');
        this.animations.play('walk', 30, true);
    }


    private onOutOfBounds() {
        if (this.y > this.game.height ) {
            this.x = this.game.world.centerX;
            this.y = 0;
        }
    }


    update(): void {
        super.update();
        switch (this.state) {
            case AlienState.FLYING:
                this.body.x = this.baseX + Alien.sin.sin[this.counter];
                this.counter++;
                break;
            case AlienState.DEFEATED:
                this.angle += 20;
                this.scale.x -= .02;
                this.scale.y -= .02;
                if ((this.game.time.now - this.defeatedTick) > 1000) {
                    this.kill();
                }
        }



    }

    onKilled() {
    }

    defeat() {
        this.explotion.play();
        this.state = AlienState.DEFEATED;
        this.defeatedTick = this.game.time.now;
    }
}