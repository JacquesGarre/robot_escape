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

    index: number; // TODO : Value object
    name: string;  // TODO : Value object
    description: string; // TODO : Value object
    size: number; // TODO : Value object
    camera: Camera; // TODO : Move to infra
    boxes: Box[] = [];  // TODO : Value object boxes
    robot: Robot;
    elevator: Elevator;
    boundaries: Boundaries;
    finished: boolean; // TODO : LevelState
    enemies: Enemy[] = []; // TODO : Enemies value object
    gameOver: boolean = false; // TODO : LevelState

    constructor(config: LevelConfig) {  
        this.index = config.index;      
        this.name = config.name;
        this.description = config.description;
        this.size = config.size;
        let boxesConfig = config.boxes ?? [];
        for(const boxConfig of boxesConfig) { // TODO : Boxes.fromConfig(...)
            let box = new Box(boxConfig);
            this.boxes.push(box); 
        }
        this.robot = new Robot(config.robot);
        this.camera = Camera.fromRobot(this.robot);
        this.elevator = new Elevator(config.elevator);
        this.boundaries = new Boundaries({    // TODO : Boundaries.fromConfig()
            xMin: 0, 
            xMax: this.size * Level.TILESIZE,
            yMin: 0,
            yMax: 0, 
            zMin: 0, 
            zMax: this.size * Level.TILESIZE, 
        })
        let enemiesConfig = config.enemies ?? [];
        for(const enemyConfig of enemiesConfig) { // TODO : Enemies.fromConfig()
            let enemy = new Enemy(enemyConfig);
            this.enemies.push(enemy)
        }
    }

    animate(controls: Controls) { // TODO : State pattern
        if (this.robot.isDead) {
            this.gameOver = true;
        }
        this.robot.animate(controls, this); 
        this.camera.follow(this.robot);  // TODO : Infra layer
        if (this.robot.isOnElevator(this.elevator)) {   // TODO : State pattern
            this.robot.setBoundaries(this.elevator.edges())
            this.elevator.goUp(this.robot); 
            if (this.elevator.hasReachedTop()) {
                this.finished = true;
            }
        }
        for(const enemy of this.enemies) { // TODO : enemies.animate()
            enemy.animate(this)
        }
    }

    gridRepresentation() { // TODO : Go for some utils 
        const levelGrid = Array.from({ length: this.size }, () =>
            Array(this.size).fill(0)
        );
        this.boxes.forEach(box => {
            let coordinates = box.getGridCoordinates()
            levelGrid[coordinates.x][coordinates.z] = 1;
        });
        levelGrid[this.elevator.coordinates.x][this.elevator.coordinates.z] = 1;
        return levelGrid
    }

    synchronize(level: Level) { 
        this.robot.center.x = level.robot.center.x;
        this.robot.center.z = level.robot.center.z;
        this.robot.rotation = level.robot.rotation;
        this.camera = level.camera;
    }

}
