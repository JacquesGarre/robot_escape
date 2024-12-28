import Level from "../domain/level/level";
import { levels } from "./levels";

export default class GameState {

    currentLevel: Level
    currentLevelKey: number;
    keyPressed: { [key: string]: boolean };
    gameover = false;
    levels = levels

    constructor() {
        this.currentLevelKey = 0;
        this.currentLevel = new Level(this.levels[this.currentLevelKey])
        this.keyPressed = {
            'ArrowUp': false,
            'ArrowDown': false,
            'ArrowLeft': false,
            'ArrowRight': false,
        }
    }

    nextLevel() {
        this.currentLevelKey += 1
        this.currentLevel = new Level(this.levels[this.currentLevelKey]);
    }

    onKeyDown(event: KeyboardEvent) {
        this.keyPressed[event.code] = true;
    }

    onKeyUp(event: KeyboardEvent) {
        this.keyPressed[event.code] = false;
    }

    animate(delta: number) {
        for(const index in this.currentLevel.enemies) {
            let enemy = this.currentLevel.enemies[index]
            enemy.animate()
        }

        if (this.currentLevel.gameover) {
            this.animateGameOver();
            return;
        }
        if (this.currentLevel.endingAnimationDone) {
            this.nextLevel();
            return;
        }
        if (this.currentLevel.ended) {
            this.currentLevel.animateEnd();
            return;
        }
        if (this.keyPressed['ArrowUp']) {
            this.currentLevel.moveForward(delta);
            return;
        }
        if (this.keyPressed['ArrowDown']) {
            this.currentLevel.moveBackward(delta); 
            return;
        }
        if (this.keyPressed['ArrowLeft']) {
            this.currentLevel.moveLeft(delta); 
            return;
        }
        if (this.keyPressed['ArrowRight']) {
            this.currentLevel.moveRight(delta); 
            return;
        }
        this.currentLevel.robot.idle();
    }

    animateGameOver() {
        this.currentLevel.camera.zoomIn()
    }

}