import EnemyConfig from "./interface/enemy_config";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import Robot from "./robot";
import RobotState from "./robot_state";

export class Enemy extends LevelObject {

    index: number; 
    x: number;
    y: number;
    z: number;
    animation: RobotState;
    animationLoop: boolean

    static SPEED = 2.5;

    constructor(config: EnemyConfig) {
        super({
            x: config.x,
            y: config.y,
            z: config.z,
            width: Robot.ROBOT_SIZE,
            height: Robot.ROBOT_HEIGHT,
            rotation: config.rotation
        })
        this.type = LevelObjectType.ENEMY
        this.index = config.index;
        this.x = config.x;
        this.z = config.z;
        this.animation = RobotState.IDLE
    }

    rotateTowards(object: LevelObject) {
        const x1 = this.center.x;
        const z1 = this.center.z;
        const x2 = object.center.x;
        const z2 = object.center.z;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        let angleRadians = Math.atan2(deltaX, deltaZ);
        let angleDegrees = (angleRadians * (180 / Math.PI));
        this.rotation = -angleDegrees
    }

    jumpAnimation() {
        this.animation = RobotState.JUMP
        this.animationLoop = false;
        setTimeout(() => {
            this.animation = RobotState.IDLE
            this.animationLoop = true;
        }, 800)
    }

    punchAnimation() {
        this.animation = RobotState.PUNCH
        this.animationLoop = false;
        setTimeout(() => {
            this.animation = RobotState.IDLE
            this.animationLoop = true;
        }, 800)
    }

}