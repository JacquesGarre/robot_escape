import RobotConfig from "./interface/robot_config";
import LevelObject from "./level_object";

export default class Robot extends LevelObject {

    static ROBOT_SIZE = 2.5;
    static ROBOT_HEIGHT = 5;

    x: number;
    y: number;
    z: number;

    constructor(config: RobotConfig) {
        super({
            x: config.x,
            y: config.y,
            z: config.z,
            width: Robot.ROBOT_SIZE,
            height: Robot.ROBOT_HEIGHT,
        })
        this.x = config.x;
        this.z = config.z;
    }

}