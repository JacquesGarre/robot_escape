import Camera from "../camera/camera";
import Cube from "../cube/cube";
import Elevator from "../elevator/elevator";
import Enemy from "../enemy/enemy";
import DirectionalLight from "../lights/directional_light";
import HemisphereLight from "../lights/hemisphere_light";
import Robot from "../robot/robot";
import Fog from "../scene/fog";
import Grid from "../scene/grid";
import Ground from "../scene/ground";
import Scene from "../scene/scene";
import Position from "../shared/position";

interface CubePosition {
    x: number;
    y: number;
    z: number;
}

interface EnemyInterface {
    x: number;
    y: number;
    z: number;
    rotation: number;
}

interface LevelConfig {
    width: number;
    height: number;
    tileSize: number;
    robotX: number;
    robotZ: number;
    robotRotation: string;
    cubes: CubePosition[];
    endX: number;
    endZ: number;
    enemies: EnemyInterface[];
}

export default class Level {

    scene: Scene;
    robot: Robot;
    camera: Camera;
    elevator: Elevator;
    tileSize: number;
    width: number;
    height: number;
    gridCenterX: number;
    gridCenterZ: number;
    leftBoundary: number;
    rightBoundary: number;
    topBoundary: number;
    bottomBoundary: number;
    cubes: Cube[];
    ended: boolean;
    endingAnimationDone: boolean;
    enemies: {};

    constructor(config: LevelConfig) {
        this.tileSize = config.tileSize;
        this.width = config.width;
        this.height = config.height;
        this.gridCenterX = (this.width * this.tileSize) / 2 - this.tileSize / 2;
        this.gridCenterZ = (this.height * this.tileSize) / 2 - this.tileSize / 2;
        this.elevator = this.initializeElevator(config.endX, config.endZ)
        this.cubes = this.initializeCubes(config.cubes)
        this.enemies = this.initializeEnemies(config.enemies)
        this.scene = this.initializeScene()
        this.robot = this.initializeRobot(config.robotX, config.robotZ, config.robotRotation);
        this.leftBoundary = -this.gridCenterX - this.robot.radius
        this.rightBoundary = this.gridCenterX + this.robot.radius
        this.topBoundary = -this.gridCenterZ - this.robot.radius
        this.bottomBoundary = this.gridCenterZ + this.robot.radius
        this.camera = Camera.fromRobot(this.robot)
        this.ended = false;
        this.endingAnimationDone = false;
    }

    initializeEnemies(positions: EnemyInterface[]) {
        let enemies = {};
        let i = 0;
        for(const position of positions) {      
            const positionX = position.x * (this.tileSize) - this.gridCenterX;
            const positionZ = -position.z * (this.tileSize) + this.gridCenterZ;
            let enemyPosition = new Position(positionX, 0, positionZ);
            let enemy = new Enemy(enemyPosition, 'Enemy'+i, position.rotation)
            enemies[i] = enemy;
            i++;
        }
        return enemies;
    }

    initializeElevator(x: number, z: number): Elevator {
        let position = new Position(
            x * (this.tileSize) - this.gridCenterX,
            0,
            -z * (this.tileSize) + this.gridCenterZ,
        )
        return new Elevator(position, 0)
    }

    initializeCubes(cubePositions: CubePosition[]) {
        let cubes: Cube[] = [];
        for (const cubePosition of cubePositions) {
            let position = new Position(
                cubePosition.x * (this.tileSize) - this.gridCenterX,
                cubePosition.y + this.tileSize / 2,
                -cubePosition.z * (this.tileSize) + this.gridCenterZ,
            )
            let cube = new Cube(position)
            cubes.push(cube);
        }
        return cubes;
    }

    initializeScene(): Scene {
        let backgroundColor = 0xe0e0e0;
        let fog = new Fog(0xe0e0e0, 20, 0);
        let hemisphereLightPosition = new Position(0, 20, 0);
        let hemisphereLight = new HemisphereLight(0xffffff, 0x8d8d8d, 2, hemisphereLightPosition);
        let directionalLightPosition = new Position(0, 20, 10);
        let directionalLight = new DirectionalLight(0xffffff, 3, directionalLightPosition);
        let ground = new Ground(this.width * this.tileSize, this.height * this.tileSize, 0xcbcbcb);
        let grid = new Grid(this.width * this.tileSize, this.width, 0x000000, 0x000000, 0.2);
        return new Scene(backgroundColor, fog, hemisphereLight, directionalLight, ground, grid, this.cubes, this.elevator);
    }

    initializeRobot(robotX: number, robotZ: number, robotRotation: string): Robot {
        const positionX = robotX * (this.tileSize) - this.gridCenterX;
        const positionZ = -robotZ * (this.tileSize) + this.gridCenterZ;
        let position = new Position(positionX, 0, positionZ);
        return new Robot('Robot', 'Idle', position, robotRotation, 15);
    }

    moveForward(delta: number) {
        this.robot.rotateForward();
        if (this.collision()) {
            return;
        }
        if (this.levelEnded()) {
            return;
        }
        this.robot.moveForward(delta);
        this.camera = Camera.fromRobot(this.robot)
    }

    moveBackward(delta: number) {
        this.robot.rotateBackward();
        if (this.collision()) {
            return;
        }
        if (this.levelEnded()) {
            return;
        }
        this.robot.moveBackward(delta);
        this.camera = Camera.fromRobot(this.robot)
    }

    moveLeft(delta: number) {
        this.robot.rotateLeft();
        if (this.collision()) {
            return;
        }
        if (this.levelEnded()) {
            return;
        }
        this.robot.moveLeft(delta);
        this.camera = Camera.fromRobot(this.robot)
    }

    moveRight(delta: number) {
        this.robot.rotateRight();
        if (this.collision()) {
            return;
        }
        if (this.levelEnded()) {
            return;
        }
        this.robot.moveRight(delta);
        this.camera = Camera.fromRobot(this.robot)
    }

    collision() {
        for (const cube of this.cubes) {
            let cubeLeftBoundary = cube.position.x - (this.tileSize / 2);
            let cubeRightBoundary = cube.position.x + (this.tileSize / 2);
            let cubeTopBoundary = cube.position.z - (this.tileSize / 2);
            let cubeBottomBoundary = cube.position.z + (this.tileSize / 2);
            switch (this.robot.direction) {
                case 'Left':
                    if (this.robot.position.z <= (cubeBottomBoundary + this.robot.radius)
                        && this.robot.position.z >= (cubeTopBoundary - this.robot.radius)
                        && cubeRightBoundary > (this.robot.position.x - this.robot.radius * 1.5)
                        && cubeLeftBoundary < (this.robot.position.x - this.robot.radius)
                    ) {
                        this.robot.break();
                        return true;
                    }
                    break;
                case 'Right':
                    if (
                        this.robot.position.z <= (cubeBottomBoundary + this.robot.radius)
                        && this.robot.position.z >= (cubeTopBoundary - this.robot.radius)
                        && cubeLeftBoundary < (this.robot.position.x + this.robot.radius * 1.5)
                        && cubeRightBoundary > (this.robot.position.x - this.robot.radius)
                    ) {
                        this.robot.break();
                        return true;
                    }
                    break;
                case 'Forward':
                    if (this.robot.position.x >= (cubeLeftBoundary - this.robot.radius)
                        && this.robot.position.x <= (cubeRightBoundary + this.robot.radius)
                        && cubeBottomBoundary > (this.robot.position.z - this.robot.radius * 1.5)
                        && cubeTopBoundary < (this.robot.position.z - this.robot.radius)
                    ) {
                        this.robot.break();
                        return true;
                    }
                    break;
                case 'Backward':
                    if (this.robot.position.x >= (cubeLeftBoundary - this.robot.radius)
                        && this.robot.position.x <= (cubeRightBoundary + this.robot.radius)
                        && cubeTopBoundary < (this.robot.position.z + this.robot.radius * 1.5)
                        && cubeBottomBoundary > (this.robot.position.z - this.robot.radius)
                    ) {
                        this.robot.break();
                        return true;
                    }
                    break;
            }
        }
        if (this.robot.direction == 'Forward' && this.topBoundary > this.robot.position.z) {
            this.robot.break();
            return true;
        }
        if (this.robot.direction == 'Backward' && this.bottomBoundary < this.robot.position.z) {
            this.robot.break();
            return true;
        }
        if (this.robot.direction == 'Left' && this.leftBoundary > this.robot.position.x) {
            this.robot.break();
            return true;
        }
        if (this.robot.direction == 'Right' && this.rightBoundary < this.robot.position.x) {
            this.robot.break();
            return true;
        }
        return false;
    }

    levelEnded() {
        let cubeLeftBoundary = this.elevator.position.x - (this.tileSize / 2);
        let cubeRightBoundary = this.elevator.position.x + (this.tileSize / 2);
        let cubeTopBoundary = this.elevator.position.z - (this.tileSize / 2);
        let cubeBottomBoundary = this.elevator.position.z + (this.tileSize / 2);
        if (
            this.robot.position.z <= (cubeBottomBoundary - this.robot.radius)
            && this.robot.position.z >= (cubeTopBoundary + this.robot.radius)
            && this.robot.position.x >= (cubeLeftBoundary + this.robot.radius)
            && this.robot.position.x <= (cubeRightBoundary - this.robot.radius)
        ) {
            this.ended = true;
            return true;
        }
    }

    animateEnd() {
        let reachedTop = this.elevator.goUp()
        this.robot.position.y = this.elevator.height
        this.robot.dance()
        if (reachedTop) {
            this.endingAnimationDone = true;
        }
    }

}