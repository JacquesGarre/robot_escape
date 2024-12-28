import Controls from "./controls";
import RobotConfig from "./interface/robot_config";
import Level from "./level";
import LevelObject from "./level_object";

export default class Robot extends LevelObject {

    static ROBOT_SIZE = 5;
    static ROBOT_HEIGHT = 5;
    static SPEED = 25;

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

    animate(delta: number, controls: Controls, level: Level) {
        this.rotate(controls)
        this.move(delta, controls, level)
    }

    move(delta: number, controls: Controls, level: Level) {
        let distance = delta * Robot.SPEED
        if (controls.up && this.canMoveUp(level, distance)) {
            this.center.z += distance
        }   
        if (controls.down && this.canMoveDown(level, distance)) {
            this.center.z -= distance
        }   
        if (controls.left && this.canMoveLeft(level, distance)) {
            this.center.x -= distance
        }   
        if (controls.right && this.canMoveRight(level, distance)) {
            this.center.x += distance
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