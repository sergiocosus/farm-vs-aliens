import * as Assets from '../assets';
import game = PIXI.game;
import {Chicken} from '../objects/chicken';
import BitmapData = Phaser.BitmapData;
import {Line} from '../objects/line';
import {Alien} from '../objects/alien';
import {ChickenStates} from '../objects/chicken-states';
import {Audio} from '../assets';
import {AlienState} from '../objects/alien-state';

export default class Title extends Phaser.State {
    private backgroundTemplateSprite: Phaser.Sprite = null;
    private sfxAudiosprite: Phaser.AudioSprite = null;
    private chicken: Chicken = null;
    private sfxLaserSounds: Assets.Audiosprites.AudiospritesSfx.Sprites[] = null;
    private initX: number;
    private initY: number;
    private graphics: Phaser.Graphics;
    private bmd: Phaser.BitmapData;
    private line1: Line;
    private line2: Line;
    private aliens: Phaser.Group;
    tick: number;

    difficulty = 0;

    public create(): void {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.backgroundTemplateSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.ImagesBackground.getName());
        this.backgroundTemplateSprite.anchor.setTo(0.5);

        this.tick = this.game.time.now;


        this.aliens = this.game.add.group();
        this.aliens.add( this.world.add(new Alien(
            this.game,
            this.game.world.centerX,
            0,
        )));


        this.chicken = this.world.add(new Chicken(
            this.game,
            this.game.world.centerX,
            this.game.world.height * .75,
        ));

        this.chicken.initChicken();
        this.line1 = new Line(this.game, this.game.width, this.game.height);
        this.line2 = new Line(this.game, this.game.width, this.game.height);


        this.game.physics.arcade.checkCollision = {up: true, down: true, left: true, right: true};

        this.chicken.events.onDragUpdate.add(chicken => {
            this.line1.drawLine(
                chicken.initX - chicken.width / 2,
                chicken.initY,
                chicken.x - chicken.width / 4,
                chicken.y);
            this.line2.drawLine(
                chicken.initX + chicken.width / 2,
                chicken.initY,
                chicken.x + chicken.width / 4,
                chicken.y);
        });


        this.chicken.events.onDragStop.add(chicken => {
            this.line1.removeLine();
            this.line2.removeLine();
        });

        this.backgroundTemplateSprite.inputEnabled = true;
        this.game.camera.flash(0x000000, 1000);
    }

    public update() {
        this.game.physics.arcade.overlap(this.chicken, this.aliens, (chicken, alien) => {
            if (this.chicken.state === ChickenStates.FLYING && alien.state === AlienState.FLYING) {
                alien.defeat();
            }
          //  alien.body.position.y = 0;
        });
        if (this.game.time.now - this.tick > Math.random() * (100000 - this.difficulty * 30 )) {
            this.aliens.add(new Alien(this.game, this.game.width * Math.random(), -100));
            this.tick = this.game.time.now;
        }
        console.log((100000 - this.difficulty ) * 10);

        this.difficulty++;
    }
}
