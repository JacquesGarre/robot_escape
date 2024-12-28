import Controls from "./controls";
import RobotConfig from "./interface/robot_config";
import LevelObject from "./level_object";

export default class Robot extends LevelObject {

    static ROBOT_SIZE = 2.5;
    static ROBOT_HEIGHT = 4;
    static ROTATION_SPEED = 300;
    static RUNNING_SPEED = 20;

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
        this.rotate(controls)
        this.run(delta, controls)
    }

    run(delta: number, controls: Controls) {
        if (controls.up) {
            this.center.z += delta * Robot.RUNNING_SPEED
        }   
        if (controls.down) {
            this.center.z -= delta * Robot.RUNNING_SPEED
        }   
        if (controls.left) {
            this.center.x += delta * Robot.RUNNING_SPEED
        }   
        if (controls.right) {
            this.center.x -= delta * Robot.RUNNING_SPEED
        }  
    }

    rotate(controls: Controls) {
        if (controls.up) {
            this.rotation = 0
        }   
        if (controls.down) {
            this.rotation = 180
        }   
        if (controls.left) {
            this.rotation = 90
        }   
        if (controls.right) {
            this.rotation = 270
        }  
    }

}