import Level from "../domain/level/level";

export default class GameState {

    currentLevel: Level
    currentLevelKey: number;
    keyPressed: { [key: string]: boolean };

    levels = [
        {
            width: 5,
            height: 5,
            tileSize: 5,
            robotX: 0,
            robotZ: 0,
            robotRotation: 'Right',
            cubes: [
                {
                    x: 2,
                    y: 0,
                    z: 2
                },
            ],
            endX: 4,
            endZ: 4,
            enemies: [
                {
                    x: 1,
                    y: 0,
                    z: 1,
                    rotation: 90,
                },
                {
                    x: 3,
                    y: 0,
                    z: 3,
                    rotation: 0,
                },
            ]
        },
        {
            width: 10,
            height: 10,
            tileSize: 5,
            robotX: 4,
            robotZ: 4,
            robotRotation: 'Right',
            cubes: [
                {
                    x: 6,
                    y: 0,
                    z: 6
                },
            ],
            endX: 9,
            endZ: 9,
            enemies: [
                {
                    x: 0,
                    y: 0,
                    z: 4,
                    rotation: 90,
                },
            ]
        }
    ]

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

}