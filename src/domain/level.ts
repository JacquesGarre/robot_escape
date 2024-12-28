import Box from "./box";
import Camera from "./camera";
import BoxConfig from "./interface/box_config";
import LevelConfig from "./interface/level_config";
import RobotConfig from "./interface/robot_config";
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
        this.camera = config.camera ?? Camera.default();
        this.addBoxes(config.boxes);
        this.addRobot(config.robot);
    }

    addBoxes(boxesConfig: BoxConfig[] | undefined) {
        if (!boxesConfig) {
            return;
        }
        for(const boxConfig of boxesConfig) {
            this.boxes.push(new Box(boxConfig));
        }
    }

    addRobot(robotConfig: RobotConfig) {
        this.robot = new Robot(robotConfig);
    }


}