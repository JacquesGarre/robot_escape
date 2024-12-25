import Level from "../domain/level/level";

export default class GameState {

    currentLevel: Level
    currentLevelKey: number;
    keyPressed: { [key: string]: boolean };

    levels = [
        {
            width: 3,
            height: 3,
            tileSize: 5,
            robotX: 0,
            robotZ: 0,
            robotRotation: 'Right',
            cubes: [],
            endX: 2,
            endZ: 2,
        },
        {
            width: 10,
            height: 10,
            tileSize: 5,
            robotX: 2,
            robotZ: 1,
            robotRotation: 'Right',
            cubes: [
                {
                    x: 2,
                    y: 0,
                    z: 4
                },
                {
                    x: 3,
                    y: 0,
                    z: 4
                },
            ],
            endX: 3,
            endZ: 3,
        },
        {
            width: 20,
            height: 20,
            tileSize: 5,
            robotX: 19,
            robotZ: 19,
            robotRotation: 'Left',
            cubes: [
                {
                    x: 2,
                    y: 0,
                    z: 4
                },
                {
                    x: 5,
                    y: 0,
                    z: 10
                },
                {
                    x: 3,
                    y: 0,
                    z: 12
                },
                {
                    x: 7,
                    y: 0,
                    z: 14
                },
            ],
            endX: 0,
            endZ: 0,
        },
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