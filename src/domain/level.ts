import Box from "./box";
import Camera from "./camera";
import Controls from "./controls";
import Elevator from "./elevator";
import LevelConfig from "./interface/level_config";
import Robot from "./robot";

export default class Level {

    static TILESIZE = 5;

    size: number;
    camera: Camera;
    boxes: Box[] = [];
    robot: Robot;
    elevator: Elevator;

    constructor(config: LevelConfig) {        
        this.size = config.size;
        let boxesConfig = config.boxes ?? [];
        for(const boxConfig of boxesConfig) {
            let box = new Box(boxConfig);
            this.boxes.push(box);
        }
        this.robot = new Robot(config.robot);
        this.camera = Camera.fromRobot(this.robot);
        this.elevator = new Elevator(config.elevator);
    }

    animate(controls: Controls) {
        this.robot.animate(
            controls, 
            this
        );
        this.camera.follow(this.robot);
    }

    boundaries() {
        return {
            xMin: 0, 
            xMax: this.size * Level.TILESIZE, 
            zMin: 0, 
            zMax: this.size * Level.TILESIZE, 
        }
        
    }

}