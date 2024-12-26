import Level from "../domain/level/level";

export default class GameState {

    currentLevel: Level
    currentLevelKey: number;
    keyPressed: { [key: string]: boolean };
    gameover = false;
    levels = [
        {
            width: 10,
            height: 10,
            tileSize: 5,
            robotX: 0,
            robotZ: 0,
            robotRotation: 'Right',
            cubes: [
                {
                    x: 3,
                    y: 0,
                    z: 5
                },
                {
                    x: 3,
                    y: 0,
                    z: 3
                },
                {
                    x: 5,
                    y: 0,
                    z: 3
                },
            ],
            endX: 9,
            endZ: 9,
            enemies: [
                {
                    x: 4,
                    y: 0,
                    z: 4,
                    rotation: -90,
                    sightDistance: 20, // 20*10 = 2metres
                    speed: 0.1
                },
                {
                    x: 4,
                    y: 0,
                    z: 5,
                    rotation: 180,
                    sightDistance: 20, // 20*10 = 2metres
                    speed: 0.1
                },
                // {
                //     x: 2,
                //     y: 0,
                //     z: 5,
                //     rotation: 180,
                //     sightDistance: 100
                // },
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
                    sightDistance: 100,
                    speed: 0.3
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