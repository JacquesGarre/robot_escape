import Box from "./box";
import Camera from "./camera";
import Controls from "./controls";
import LevelConfig from "./interface/level_config";
import Robot from "./robot";

export default class Level {

    static DEFAULT_SIZE = 5;
    static DEFAULT_TILESIZE = 5;

    size: number;
    tileSize: number;
    camera: Camera;
    boxes: Box[] = [];
    robot: Robot;

    constructor(config: LevelConfig) {
        this.size = config.size ?? Level.DEFAULT_SIZE;
        this.tileSize = config.tileSize ?? Level.DEFAULT_TILESIZE;
        let boxesConfig = config.boxes ?? [];
        for(const boxConfig of boxesConfig) {
            let box = new Box(boxConfig);
            this.boxes.push(box);
        }
        this.robot = new Robot(config.robot);
        this.camera = Camera.fromRobot(this.robot);
    }

    animate(delta: number, controls: Controls) {
        this.robot.animate(delta, controls);
        this.camera.follow(this.robot);
    }

}