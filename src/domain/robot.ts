import Controls from "./controls";
import RobotConfig from "./interface/robot_config";
import LevelObject from "./level_object";

export default class Robot extends LevelObject {

    static ROBOT_SIZE = 2.5;
    static ROBOT_HEIGHT = 4;

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
            rotation: config.rotation
        })
        this.x = config.x;
        this.z = config.z;
    }

    animate(delta: number, controls: Controls) {
        this.rotate(delta, controls)
        this.run(delta, controls)
    }

    rotate(delta: number, controls: Controls) {

    }

    walk(delta: number, controls: Controls) {

    }

    run(delta: number, controls: Controls) {

    }

}