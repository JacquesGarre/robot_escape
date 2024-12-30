import Boundaries from "./boundaries";
import Box from "./box";
import Camera from "./camera";
import Controls from "./controls";
import Elevator from "./elevator";
import { Enemy } from "./enemy";
import LevelConfig from "./interface/level_config";
import Robot from "./robot";

export default class Level {

    static TILESIZE = 5;

    index: number;
    size: number;
    camera: Camera;
    boxes: Box[] = [];
    robot: Robot;
    elevator: Elevator;
    boundaries: Boundaries;
    finished: boolean;
    enemies: Enemy[] = [];

    constructor(config: LevelConfig) {  
        this.index = config.index;      
        this.size = config.size;
        let boxesConfig = config.boxes ?? [];
        for(const boxConfig of boxesConfig) {
            let box = new Box(boxConfig);
            this.boxes.push(box);
        }
        this.robot = new Robot(config.robot);
        this.camera = Camera.fromRobot(this.robot);
        this.elevator = new Elevator(config.elevator);
        this.boundaries = new Boundaries({
            xMin: 0, 
            xMax: this.size * Level.TILESIZE,
            yMin: 0,
            yMax: 0, 
            zMin: 0, 
            zMax: this.size * Level.TILESIZE, 
        })
        let enemiesConfig = config.enemies ?? [];
        for(const enemyConfig of enemiesConfig) {
            let enemy = new Enemy(enemyConfig);
            this.enemies.push(enemy)
        }
    }

    animate(controls: Controls) {
        this.robot.animate(controls, this);
        this.camera.follow(this.robot);
        if (this.robot.isOnElevator(this.elevator)) {
            this.robot.setBoundaries(this.elevator.edges())
            this.elevator.goUp(this.robot);
            if (this.elevator.hasReachedTop()) {
                this.finished = true;
            }
        }
        for(const enemy of this.enemies) {
            enemy.animate(this)
        }
    }

    gridRepresentation() {
        const levelGrid = Array.from({ length: this.size }, () =>
            Array(this.size).fill(0)
        );
        this.boxes.forEach(box => {
            levelGrid[box.x][box.z] = 1;
        });
        levelGrid[this.elevator.x][this.elevator.z] = 1;
        return levelGrid
    }

    synchronize(level: Level) {
        this.robot.center.x = level.robot.center.x;
        this.robot.center.z = level.robot.center.z;
        this.robot.rotation = level.robot.rotation;
        this.camera = level.camera;
    }

}