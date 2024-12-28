import Boundaries from "./boundaries";
import Controls from "./controls";
import Elevator from "./elevator";
import RobotConfig from "./interface/robot_config";
import Level from "./level";
import LevelObject from "./level_object";
import RobotState from "./robot_state";
import Utils from "./utils";

export default class Robot extends LevelObject {

    static ROBOT_SIZE = 2.5;
    static ROBOT_HEIGHT = 5;
    static SPEED = 2.5;

    x: number;
    y: number;
    z: number;
    animation: string;
    disabled: boolean;

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
        this.disabled = false;
        this.animation = RobotState.IDLE
    }

    animate(controls: Controls, level: Level) {
        this.rotate(controls)
        if (controls.arePressed()) {
            this.move(controls, level)
            this.animation = RobotState.RUNNING
        } else {
            this.animation = RobotState.IDLE
        }
    }

    move(controls: Controls, level: Level) {
        if (this.disabled) {
            return;
        }
        let distance = Utils.round(0.1 * Robot.SPEED)
        if (controls.up && this.canMoveUp(level, distance)) {
            this.center.z += distance
        }   
        if (controls.down && this.canMoveDown(level, distance)) {
            this.center.z -= distance
        }   
        if (controls.right && this.canMoveRight(level, distance)) {
            this.center.x += distance
        }  
        if (controls.left && this.canMoveLeft(level, distance)) {
            this.center.x -= distance
        }   
    }

    rotate(controls: Controls) {
        if (controls.up) {
            this.rotation = 0
            if (controls.right) {
                this.rotation = 315
            }
            if (controls.left) {
                this.rotation = 45
            }
        }   
        if (controls.down) {
            this.rotation = 180
            if (controls.right) {
                this.rotation = 225
            }
            if (controls.left) {
                this.rotation = 135
            }
        }   
        if (controls.left) {
            this.rotation = 90  
            if (controls.up) {
                this.rotation = 45
            }
            if (controls.down) {
                this.rotation = 135
            }
        }   
        if (controls.right) {
            this.rotation = 270
            if (controls.up) {
                this.rotation = 315
            }
            if (controls.down) {
                this.rotation = 225
            }
        }  
    }

    isOnElevator(elevator: Elevator): boolean {
        const edges = this.edges()
        const boundaries = elevator.edges();
        return edges.xMin >= boundaries.xMin
            && edges.xMax <= boundaries.xMax
            && edges.zMin >= boundaries.zMin
            && edges.zMax <= boundaries.zMax;
    }

    setBoundaries(boundaries: Boundaries) {
        this.boundaries = boundaries
    }

    sayGoodByeToLevel() {
        this.animation = RobotState.WAVING;
        this.disabled = true;
        this.rotation = 180;
    }

}