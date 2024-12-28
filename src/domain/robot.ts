import Box from "./box";
import Controls from "./controls";
import RobotConfig from "./interface/robot_config";
import LevelObject from "./level_object";

export default class Robot extends LevelObject {

    static ROBOT_SIZE = 2.5;
    static ROBOT_HEIGHT = 4;
    static MOVING_SPEED = 10;

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

    animate(delta: number, controls: Controls, boxes: Box[]) {
        this.rotate(controls)
        this.move(delta, controls, boxes)
    }

    move(delta: number, controls: Controls, boxes: Box[]) {
        let distance = delta * Robot.MOVING_SPEED
        if (controls.up && this.canMoveUp(boxes, distance)) {
            this.center.z += distance
        }   
        if (controls.down && this.canMoveDown(boxes, distance)) {
            this.center.z -= distance
        }   
        if (controls.left && this.canMoveLeft(boxes, distance)) {
            this.center.x += distance
        }   
        if (controls.right && this.canMoveRight(boxes, distance)) {
            this.center.x -= distance
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